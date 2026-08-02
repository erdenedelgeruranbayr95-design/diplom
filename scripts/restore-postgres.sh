#!/usr/bin/env bash
# Postgres restore — backup-postgres.sh-ийн үүсгэсэн .sql.gz dump-аас DB-г сэргээнэ.
#
# АЮУЛТАЙ ҮЙЛДЭЛ: одоо байгаа DB-ийн бүх өгөгдлийг УСТГАЖ, dump-ийнхээр солино.
# Тиймээс заавал --yes флаг ШААРДАНА (санамсаргүй ажиллуулахаас сэргийлнэ).
#
# Хэрэглээ: ./restore-postgres.sh backups/medreh_20260101_030000.sql.gz --yes
set -euo pipefail

DUMP_FILE="${1:?Хэрэглээ: $0 <dump.sql.gz> --yes}"
CONFIRM="${2:-}"

if [[ "$CONFIRM" != "--yes" ]]; then
  echo "АЮУЛТАЙ: энэ скрипт одоо байгаа DB-ийг бүрмөсөн УСТГАЖ, dump-аар СОЛИНО."
  echo "Зөвшөөрч байгаагаа батлахын тулд: $0 $DUMP_FILE --yes"
  exit 1
fi

if [[ ! -f "$DUMP_FILE" ]]; then
  echo "Dump файл олдсонгүй: $DUMP_FILE"
  exit 1
fi

CONTAINER="${POSTGRES_CONTAINER:-backend-postgres-1}"
DB_USER="${POSTGRES_USER:-medreh}"
DB_NAME="${POSTGRES_DB:-medreh}"

echo "[restore] $DUMP_FILE -> $CONTAINER:$DB_NAME"
echo "[restore] одоо байгаа схемийг устгаж байна..."
docker exec "$CONTAINER" psql -U "$DB_USER" -d "$DB_NAME" -c \
  "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"

echo "[restore] dump-ыг сэргээж байна..."
gunzip -c "$DUMP_FILE" | docker exec -i "$CONTAINER" psql -U "$DB_USER" -d "$DB_NAME"

echo "[restore] амжилттай дууслаа."
