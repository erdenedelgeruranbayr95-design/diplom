"""HLS/AAC хөрвүүлэлт (ffmpeg) — Song upload дараа Haptic Score-той зэрэгцээ ажиллана.

Чухал: **low-cut (high-pass filter) хийхгүй** — Haptic Score-ийн 8 бүсийн хамгийн доод
зурвас (20-60Hz, бас) чичиргээний гол эх үүсвэр тул ffmpeg default кодлолт (аудио
давтамжийн муж таслахгүй, зөвхөн битрейт/кодек хувиргана) ашиглана.

Гаралт: `hls/<songId>/master.m3u8` + `.ts` segment-үүд, MinIO руу байршина.
"""

import logging
import shutil
import subprocess
import tempfile
from pathlib import Path

from . import storage

log = logging.getLogger("haptic-worker.transcode")

FFMPEG_BIN = shutil.which("ffmpeg") or "ffmpeg"
SEGMENT_SEC = 6


def transcode_to_hls(source_path: Path, song_id: str) -> str | None:
    """AAC/HLS болгож хөрвүүлээд MinIO-д байршуулна, `master.m3u8`-ийн public URL буцаана.
    ffmpeg байхгүй эсвэл алдаа гарвал `None` буцааж, дуудагч тал зөвхөн лог бичээд
    үргэлжлүүлнэ (HLS байхгүй ч эх fileUrl (mp3/wav) хэвээр тоглогдож болно —
    заавал биш баяжуулалт, DoD-ийг таслах шалтгаан биш)."""
    if shutil.which("ffmpeg") is None and not Path(FFMPEG_BIN).exists():
        log.warning("ffmpeg олдсонгүй — HLS хөрвүүлэлт алгасав (эх файл шууд тоглогдоно)")
        return None

    with tempfile.TemporaryDirectory(prefix=f"hls-{song_id}-") as tmp:
        out_dir = Path(tmp)
        playlist = out_dir / "master.m3u8"
        segment_pattern = out_dir / "seg_%05d.ts"

        cmd = [
            FFMPEG_BIN,
            "-y",
            "-i",
            str(source_path),
            "-vn",  # аудио л (ковер embed зураг байвал video stream-ээр үзэгддэг тул хасна)
            "-c:a",
            "aac",
            "-b:a",
            "192k",
            "-ar",
            "44100",
            # low-cut/high-pass ФИЛЬТР ЗОРИУДААР АШИГЛААГҮЙ — бас (20-60Hz) haptic-ийн гол эх үүсвэр.
            "-f",
            "hls",
            "-hls_time",
            str(SEGMENT_SEC),
            "-hls_playlist_type",
            "vod",
            "-hls_segment_filename",
            str(segment_pattern),
            str(playlist),
        ]
        try:
            subprocess.run(cmd, check=True, capture_output=True, text=True, timeout=300)
        except subprocess.CalledProcessError as exc:
            log.error(f"ffmpeg HLS хөрвүүлэлт амжилтгүй (songId={song_id}): {exc.stderr[-500:]}")
            return None
        except subprocess.TimeoutExpired:
            log.error(f"ffmpeg HLS хөрвүүлэлт хугацаа хэтэрлээ (songId={song_id})")
            return None

        if not playlist.exists():
            log.error(f"ffmpeg дууссан ч playlist үүсээгүй (songId={song_id})")
            return None

        storage.upload_dir(out_dir, f"hls/{song_id}")
        return storage.public_url(f"hls/{song_id}/master.m3u8")
