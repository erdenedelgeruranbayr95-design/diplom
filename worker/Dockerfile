# syntax=docker/dockerfile:1
FROM python:3.13-slim

WORKDIR /app

# ffmpeg — HLS/AAC хөрвүүлэлт (transcode.py), libsndfile — librosa/soundfile-д шаардлагатай.
RUN apt-get update \
  && apt-get install -y --no-install-recommends ffmpeg libsndfile1 \
  && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY worker ./worker

RUN useradd --create-home medreh && chown -R medreh:medreh /app
USER medreh

CMD ["python", "-m", "worker.main"]
