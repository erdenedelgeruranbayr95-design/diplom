#!/usr/bin/env bash
# Postgres backup — docker compose дэх `postgres` container-аас pg_dump ашиглан
# шахсан SQL dump үүсгэнэ. Cron-оор өдөр бүр ажиллуулахад зориулагдсан:
#   0 3 * * * /opt/medreh/scripts/backup-postgres.sh >> /var/log/medreh-backup.log 2>&1
#
# S3 versioning: BACKUP_S3_BUCKET тохируулсан бол (aws-cli эсвэл `mc` MinIO client
# суусан орчинд) dump-ыг MinIO/S3 руу давхар хуулна — bucket versioning идэвхжсэн
# байвал өдөр бүрийн хуулбар автоматаар хадгалагдана (aws s3api put-bucket-versioning).
set -euo pipefail

COMPOSE_PROJECT_DIR="${COMPOSE_PROJECT_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)}"
CONTAINER="${POSTGRES_CONTAINER:-backend-postgres-1}"
DB_USER="${POSTGRES_USER:-medreh}"
DB_NAME="${POSTGRES_DB:-medreh}"
BACKUP_DIR="${BACKUP_DIR:-$COMPOSE_PROJECT_DIR/backups}"
TIMESTAMP="$(date +%Y%m%d_%H%M%S)"
OUT_FILE="$BACKUP_DIR/medreh_${TIMESTAMP}.sql.gz"

mkdir -p "$BACKUP_DIR"

echo "[backup] $CONTAINER -> $OUT_FILE"
docker exec "$CONTAINER" pg_dump -U "$DB_USER" "$DB_NAME" | gzip > "$OUT_FILE"

SIZE=$(du -h "$OUT_FILE" | cut -f1)
echo "[backup] дууслаа: $OUT_FILE ($SIZE)"

# 30 хоногоос хуучин локал хуулбарыг цэвэрлэнэ (S3-д давхар хадгалагдсан тул
# локал диск хязгааргүй өсөхгүй байх зорилготой).
find "$BACKUP_DIR" -name 'medreh_*.sql.gz' -mtime +30 -delete

if [[ -n "${BACKUP_S3_BUCKET:-}" ]]; then
  if command -v mc &> /dev/null; then
    echo "[backup] MinIO/S3 руу хуулж байна: $BACKUP_S3_BUCKET"
    mc cp "$OUT_FILE" "$BACKUP_S3_BUCKET/$(basename "$OUT_FILE")"
  elif command -v aws &> /dev/null; then
    aws s3 cp "$OUT_FILE" "s3://$BACKUP_S3_BUCKET/$(basename "$OUT_FILE")"
  else
    echo "[backup] АНХААР: BACKUP_S3_BUCKET тохирсон ч 'mc' эсвэл 'aws' cli олдсонгүй — S3 хуулбар алгассан"
  fi
fi
