"""Шинжлэгдээгүй дуунуудыг Redis дараалалд нэмнэ.

ЯАГААД ЭНЭ ХЭРЭГТЭЙ ВЭ
Backend нь `haptic:jobs` дараалалд ажил нэмдэг ЦОРЫН ГАНЦ мөч бол шинэ дуу
upload/import хийгдэх үе (`HapticService.enqueueAnalysis`). Seed хийсэн буюу
өмнө нь амжилтгүй болсон дуунуудыг ДАХИН дараалуулах API байдаггүй.

Энэ скрипт нийтийн `GET /songs`-оос жагсаалт аваад, `analysisStatus` нь `READY`
БИШ дуунуудыг шууд Redis рүү тавина. Worker-ийн хүлээдэг ажлын хэлбэр:
    {"songId": "...", "fileUrl": "...", "coverUrl": "..."}

Хэрэглээ:
    python enqueue_pending.py            # шинжлэгдээгүй бүгдийг
    python enqueue_pending.py --all      # READY-г ч дахин шинжлүүлэх
    python enqueue_pending.py --limit 3  # эхний 3-ыг л (туршихад)
"""

import argparse
import json
import os
import sys

import redis
import requests
from dotenv import load_dotenv

# Замыг тайлах логикийг worker-тэй ХУВААЛЦАНА — хоёр газар давхардуулбал
# нэгийг нь засахад нөгөө нь хоцорно.
from worker.main import resolve_local_path

# Windows-ийн консол өгөгдмөлөөр cp1252 кодчлолтой тул кирилл үсэг хэвлэхэд
# UnicodeEncodeError өгдөг (дууны нэрс монголоор). UTF-8 руу шилжүүлнэ.
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

load_dotenv()

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")
BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:3000")
JOB_QUEUE = "haptic:jobs"


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--all", action="store_true", help="READY дуунуудыг ч дахин дараалуулна")
    parser.add_argument("--limit", type=int, default=0, help="Хамгийн ихдээ хэдэн дуу (0 = хязгааргүй)")
    parser.add_argument(
        "--skip-file-check",
        action="store_true",
        help="Локал файл байгаа эсэхийг шалгахгүй (өөр машин дээр worker ажиллуулах үед)",
    )
    args = parser.parse_args()

    try:
        res = requests.get(f"{BACKEND_URL}/api/songs", timeout=30)
        res.raise_for_status()
    except Exception as exc:  # noqa: BLE001
        print(f"✗ Backend-ээс дууны жагсаалт авч чадсангүй: {exc}")
        print(f"  {BACKEND_URL} дээр backend ажиллаж байгаа эсэхийг шалгана уу.")
        return 1

    songs = res.json()
    targets = [s for s in songs if args.all or s.get("analysisStatus") != "READY"]

    # DB-д мөр байгаа ч аудио файл нь байхгүй дуунууд бий. Тэдгээрийг дараалуулбал
    # worker 3 удаа дэмий оролдоод dead-letter рүү явуулна — урьдчилж шүүнэ.
    # (Энэ скрипт файлуудтай НЭГ машин дээр ажилладаг тул шалгах боломжтой.)
    no_url = [s for s in targets if not s.get("fileUrl")]
    targets = [s for s in targets if s.get("fileUrl")]

    missing = []
    if not args.skip_file_check:
        keep = []
        for s in targets:
            url = s["fileUrl"]
            if url.startswith("http://") or url.startswith("https://"):
                keep.append(s)  # алсын файлыг татаж байж л мэдэх тул шалгахгүй
            elif resolve_local_path(url).exists():
                keep.append(s)
            else:
                missing.append(s)
        targets = keep

    if args.limit:
        targets = targets[: args.limit]

    if not targets:
        print("Дараалуулах дуу алга.")
        return 0

    r = redis.from_url(REDIS_URL)
    for s in targets:
        job = {"songId": s["id"], "fileUrl": s["fileUrl"]}
        if s.get("coverUrl"):
            job["coverUrl"] = s["coverUrl"]
        r.lpush(JOB_QUEUE, json.dumps(job))
        print(f"  + {s['title']}  ({s.get('analysisStatus')})")

    print(f"\n✓ {len(targets)} ажил дараалалд нэмэгдлээ ({JOB_QUEUE})")
    if no_url:
        print(f"⚠ {len(no_url)} дуу fileUrl-гүй тул алгаслаа")
    if missing:
        print(f"⚠ {len(missing)} дуу аудио файл нь олдсонгүй тул алгаслаа:")
        for s in missing[:5]:
            print(f"    {s['title']} → {s['fileUrl']}")
        if len(missing) > 5:
            print(f"    … бас {len(missing) - 5}")
    print("Одоо worker-ийг ажиллуулна:  python -m worker.main")
    return 0


if __name__ == "__main__":
    sys.exit(main())
