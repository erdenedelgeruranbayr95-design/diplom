"""Ковер зураг → WebP/AVIF, олон хэмжээ (thumbnail/medium/large).

Curator/upload үед `coverUrl` эх (жиш. jpg/png) URL ирвэл, worker татаж авч
Pillow-оор дараах хэмжээнүүдэд хөрвүүлж MinIO-д байршуулна:
  - thumb  (96×96)   — жагсаалт/карт
  - medium (400×400) — Player дэлгэц
  - large  (1200×1200) — Curator дэлгэрэнгүй/дэлгэц дүүргэх

AVIF Pillow-ийн үндсэн build-д зарим тохиолдолд дэмжигдэхгүй байж болзошгүй тул
(pillow-avif-plugin суулгаагүй бол) WebP-г үндсэн гаралт болгож, AVIF-ыг
"боломжтой бол нэмэлт" байдлаар оролдоно — WebP аль хэдийн орчин үеийн бүх
browser дээр дэмжигддэг тул цорын ганц шаардлагатай формат."""

import logging
import tempfile
from io import BytesIO
from pathlib import Path

import requests
from PIL import Image

from . import storage

log = logging.getLogger("haptic-worker.cover")

SIZES = {"thumb": 96, "medium": 400, "large": 1200}


def process_cover(source_url: str, song_id: str) -> dict[str, str] | None:
    """Эх ковер зургийг татаж, WebP олон хэмжээгээр MinIO-д байршуулна.
    Буцаах утга: `{"thumb": url, "medium": url, "large": url}` эсвэл алдаа гарвал `None`."""
    try:
        res = requests.get(source_url, timeout=30)
        res.raise_for_status()
        img = Image.open(BytesIO(res.content)).convert("RGB")
    except Exception as exc:  # noqa: BLE001
        log.warning(f"Ковер зураг татахад алдаа (songId={song_id}): {exc}")
        return None

    urls: dict[str, str] = {}
    for name, size in SIZES.items():
        resized = img.copy()
        resized.thumbnail((size, size), Image.LANCZOS)
        buf = BytesIO()
        resized.save(buf, format="WEBP", quality=82)
        buf.seek(0)

        key = f"covers/{song_id}-{name}.webp"
        # boto3.upload_file() файлын зам хүлээдэг тул түр файлд бичээд байршуулна.
        with tempfile.NamedTemporaryFile(suffix=".webp", delete=False) as tmp:
            tmp.write(buf.getvalue())
            tmp_path = Path(tmp.name)
        try:
            urls[name] = storage.upload_file(tmp_path, key, content_type="image/webp")
        finally:
            tmp_path.unlink(missing_ok=True)

    return urls
