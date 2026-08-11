"""Haptic Score worker — Redis дараалалаас job авч, librosa-аар задалж,
үр дүнг backend руу HTTP callback-аар мэдэгдэнэ.

Ажлын урсгал:
  1. BRPOP `haptic:jobs` (blocking, timeout-той — процесс чирэгдэхгүй sигнал шалгаж чадна)
  2. `fileUrl`-аар аудио файлыг MinIO/S3 public URL-аас HTTP-ээр татаж авна
     (legacy `/uploads/xxx.mp3` локал замтай Song мөрүүдтэй ч нийцтэй)
  3. `analysis.analyze()` — STFT→8 бүс, onset, beat, chroma→key
  4. Score-ыг локал файлд бичээд, backend руу scoreUrl-аар дамжуулна
  5. Амжилттай/амжилтгүй хоёуланд нь HTTP callback (`POST /songs/haptic-callback`)
  6. Алдаа гарвал MAX_RETRIES хүртэл дахин оролдоно, дараа нь dead-letter руу
"""

import json
import logging
import os
import sys
import time
import traceback
from pathlib import Path

import redis
import requests
from dotenv import load_dotenv

from .analysis import analyze, save_score
from .transcode import transcode_to_hls
from .cover import process_cover

# Windows-ийн консол өгөгдмөлөөр cp1252 — лог мессежүүд монголоор бичигдсэн тул
# кодчлолыг UTF-8 болгохгүй бол `UnicodeEncodeError`-оор worker унана.
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

load_dotenv()

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
log = logging.getLogger("haptic-worker")

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")
JOB_QUEUE = "haptic:jobs"
DEAD_LETTER_QUEUE = "haptic:dead-letter"
BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:3000")
CALLBACK_SECRET = os.getenv("HAPTIC_CALLBACK_SECRET", "")
UPLOADS_DIR = Path(os.getenv("UPLOADS_DIR", "../backend/uploads")).resolve()
SCORES_DIR = Path(os.getenv("SCORES_DIR", "../backend/uploads/scores")).resolve()
# Seed хийсэн дуунуудын аудио нь frontend-ийн статик хавтаст байрладаг
# (`/tracks/song-1.mp3` → frontend/public/tracks/song-1.mp3), backend-ийн uploads-д БИШ.
TRACKS_DIR = Path(os.getenv("TRACKS_DIR", "../frontend/public/tracks")).resolve()
MAX_RETRIES = 3
POLL_TIMEOUT_SEC = 5


def send_callback(song_id: str, status: str, **kwargs) -> None:
    payload = {"songId": song_id, "status": status, **kwargs}
    try:
        res = requests.post(
            f"{BACKEND_URL}/api/songs/haptic-callback",
            json=payload,
            headers={"x-haptic-secret": CALLBACK_SECRET},
            timeout=10,
        )
        res.raise_for_status()
    except Exception as exc:  # noqa: BLE001 — callback чанга унах ёсгүй, лог хийгээд үргэлжлүүлнэ
        log.error(f"Callback илгээхэд алдаа гарлаа (songId={song_id}): {exc}")


def resolve_local_path(file_url: str) -> Path:
    """Харьцангуй `fileUrl`-ыг локал файлын зам болгож хөрвүүлнэ.

    Хоёр эх сурвалж байдаг:
      · `/uploads/xxx.mp3` — хэрэглэгчийн upload хийсэн (backend/uploads)
      · `/tracks/xxx.mp3`  — seed хийсэн демо дуу (frontend/public/tracks)

    Урьд нь зөвхөн эхнийхийг л мэддэг байсан бөгөөд `split("/uploads/")[-1]` нь
    таарахгүй үед БҮТЭН замыг ("/tracks/song-1.mp3") буцаадаг байв. Тэр нь `/`-ээр
    эхэлдэг тул `UPLOADS_DIR / name` үйлдэл язгуур руу үсэрч (pathlib-ийн дүрэм),
    seed дуунууд хэзээ ч олдохгүй байсан.
    """
    if "/uploads/" in file_url:
        return UPLOADS_DIR / file_url.split("/uploads/")[-1]
    if "/tracks/" in file_url:
        return TRACKS_DIR / file_url.split("/tracks/")[-1]
    # Танихгүй хэлбэр — зөвхөн файлын нэрээр хоёуланд нь хайж үзнэ.
    name = Path(file_url).name
    for base in (UPLOADS_DIR, TRACKS_DIR):
        candidate = base / name
        if candidate.exists():
            return candidate
    return UPLOADS_DIR / name


def download_to_temp(file_url: str, song_id: str) -> Path:
    """MinIO/S3 public URL-аас аудио файлыг татаж, түр файлд бичнэ (librosa зам шаардана)."""
    import tempfile

    res = requests.get(file_url, timeout=60)
    res.raise_for_status()
    suffix = Path(file_url.split("?")[0]).suffix or ".mp3"
    tmp_dir = Path(tempfile.gettempdir()) / "medreh-haptic-worker"
    tmp_dir.mkdir(parents=True, exist_ok=True)
    tmp_path = tmp_dir / f"{song_id}{suffix}"
    tmp_path.write_bytes(res.content)
    return tmp_path


def process_job(job: dict) -> None:
    song_id = job["songId"]
    file_url = job["fileUrl"]
    cover_url = job.get("coverUrl")
    log.info(f"Job эхэллээ: songId={song_id}")

    downloaded = False
    if file_url.startswith("http://") or file_url.startswith("https://"):
        local_path = download_to_temp(file_url, song_id)
        downloaded = True
    else:
        local_path = resolve_local_path(file_url)
        if not local_path.exists():
            raise FileNotFoundError(f"Аудио файл олдсонгүй: {local_path}")

    try:
        result = analyze(str(local_path))

        # HLS/AAC хөрвүүлэлт — заавал биш баяжуулалт (ffmpeg байхгүй/алдаа гарвал
        # None буцаад Score-ийн үр дүнд нөлөөлөхгүй, эх fileUrl хэвээр тоглогдоно).
        hls_url = transcode_to_hls(local_path, song_id)
    finally:
        if downloaded:
            local_path.unlink(missing_ok=True)

    # Ковер зураг → WebP олон хэмжээ (заавал биш, coverUrl өгөгдсөн үед л).
    #
    # ⚠️ Алдааг ЗААВАЛ энд барина. Ковер боловсруулалт нь S3/MinIO рүү хуулдаг тул
    # bucket байхгүй, эсвэл сүлжээ тасарсан үед онцгой алдаа шиддэг. Урьд нь тэр нь
    # `process_job`-оос гарч job-ыг БҮХЭЛД нь унагаадаг байсан — өөрөөр хэлбэл
    # librosa-гийн шинжилгээ амжилттай болсон ч ЧИЧИРГЭЭНИЙ ӨГӨГДӨЛ хадгалагдахгүй,
    # дуу PENDING хэвээр үлддэг байв. Ковер бол зөвхөн гоо сайхны сайжруулалт
    # (эх `coverUrl` хэвээрээ харагдана), харин цохилтын өгөгдөл бол энэ системийн
    # ҮНДСЭН ЗОРИЛГО — түүнийг зургийн улмаас золиослохгүй.
    cover_urls = None
    if cover_url:
        try:
            cover_urls = process_cover(cover_url, song_id)
        except Exception as exc:  # noqa: BLE001
            log.warning(f"Ковер боловсруулалт алгасав (songId={song_id}): {exc}")

    SCORES_DIR.mkdir(parents=True, exist_ok=True)
    out_path = SCORES_DIR / f"{song_id}.json"
    save_score(result, str(out_path))
    score_url = f"/uploads/scores/{song_id}.json"

    send_callback(
        song_id,
        "READY",
        scoreUrl=score_url,
        bpm=result.bpm,
        musicalKey=result.musical_key,
        beatTimestamps=result.beat_times,
        # ⚠️ Score файл нь ЛОКАЛ дискэнд үлддэг тул үүлэн дээрх backend түүнийг
        # уншиж чаддаггүй. Цохилт бүрийн эрчим/өнгийг (~3 KB) энд дамжуулснаар
        # өгөгдлийн санд хадгалагдаж, ямар ч орчинд ажиллана.
        beatIntensity=result.beat_intensity,
        beatBrightness=result.beat_brightness,
        hlsUrl=hls_url,
        coverThumbUrl=cover_urls.get("thumb") if cover_urls else None,
        coverMediumUrl=cover_urls.get("medium") if cover_urls else None,
        coverLargeUrl=cover_urls.get("large") if cover_urls else None,
    )
    log.info(f"Job дууслаа: songId={song_id}, bpm={result.bpm}, key={result.musical_key}, hls={'тийм' if hls_url else 'үгүй'}")


def run() -> None:
    r = redis.from_url(REDIS_URL)
    log.info(f"Worker эхэллээ — {REDIS_URL} дараалал сонсож байна ({JOB_QUEUE})")

    while True:
        item = r.brpop(JOB_QUEUE, timeout=POLL_TIMEOUT_SEC)
        if item is None:
            continue  # timeout — дахин BRPOP-аар сонсоно (процесс амьд байгааг батална)

        _, raw = item
        job = json.loads(raw)
        song_id = job.get("songId", "unknown")
        attempts = job.get("_attempts", 0)

        try:
            process_job(job)
        except Exception as exc:  # noqa: BLE001
            attempts += 1
            log.error(f"Job амжилтгүй (songId={song_id}, оролдлого {attempts}/{MAX_RETRIES}): {exc}")
            log.debug(traceback.format_exc())
            if attempts < MAX_RETRIES:
                job["_attempts"] = attempts
                time.sleep(min(2**attempts, 30))  # exponential backoff
                r.lpush(JOB_QUEUE, json.dumps(job))
            else:
                r.lpush(DEAD_LETTER_QUEUE, json.dumps(job))
                send_callback(song_id, "FAILED", error=str(exc))


if __name__ == "__main__":
    run()
