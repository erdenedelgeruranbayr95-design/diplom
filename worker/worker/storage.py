"""MinIO/S3 руу объект байршуулах туслах модуль — backend-ийн `StorageService`-тэй
адилхан bucket/endpoint ашиглана (ижил `.env` хувьсагчид: S3_ENDPOINT · S3_BUCKET ·
S3_ACCESS_KEY · S3_SECRET_KEY · S3_PUBLIC_URL). Worker HLS segment/playlist болон
ковер зургийн боловсруулсан хувилбаруудыг энд байршуулна (Song.fileUrl-тай ижил
bucket, өөр prefix: `hls/`, `covers/`)."""

import mimetypes
import os
from pathlib import Path

import boto3
from botocore.client import Config

_client = None


def _get_client():
    global _client
    if _client is None:
        _client = boto3.client(
            "s3",
            endpoint_url=os.getenv("S3_ENDPOINT", "http://localhost:9000"),
            aws_access_key_id=os.getenv("S3_ACCESS_KEY", "medreh_minio"),
            aws_secret_access_key=os.getenv("S3_SECRET_KEY", "medreh_minio_pw"),
            region_name=os.getenv("S3_REGION", "us-east-1"),
            config=Config(signature_version="s3v4", s3={"addressing_style": "path"}),
        )
    return _client


def bucket() -> str:
    return os.getenv("S3_BUCKET", "medreh-media")


def public_url(key: str) -> str:
    base = os.getenv("S3_PUBLIC_URL", "http://localhost:9000/medreh-media").rstrip("/")
    return f"{base}/{key}"


def upload_file(local_path: Path, key: str, content_type: str | None = None) -> str:
    """Нэг файлыг байршуулаад public URL-ыг буцаана."""
    ctype = content_type or mimetypes.guess_type(str(local_path))[0] or "application/octet-stream"
    _get_client().upload_file(str(local_path), bucket(), key, ExtraArgs={"ContentType": ctype})
    return public_url(key)


def upload_dir(local_dir: Path, key_prefix: str) -> None:
    """Директор доtorх бүх файлыг (HLS segment+playlist) нэг нэгээр нь байршуулна."""
    for path in sorted(local_dir.rglob("*")):
        if path.is_file():
            rel = path.relative_to(local_dir).as_posix()
            upload_file(path, f"{key_prefix}/{rel}")
