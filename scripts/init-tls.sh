#!/usr/bin/env bash
# Эхний Let's Encrypt сертификат авах нэг удаагийн скрипт (docker-compose.tls.yml-ийн
# `nginx` service TLS сертификатгүйгээр эхлэх боломжгүй тул үүнийг нэгдүгээрт ажиллуулна).
#
# Урьдчилсан нөхцөл: PUBLIC_DOMAIN-ийн DNS A/AAAA бичлэг энэ серверийн IP рүү аль
# хэдийн чиглэсэн байх ёстой (энэ скрипт domain/DNS-ийг өөрөө тохируулж чадахгүй).
#
# Хэрэглээ:
#   PUBLIC_DOMAIN=medreh.example.com LETSENCRYPT_EMAIL=admin@example.com ./scripts/init-tls.sh
set -euo pipefail

: "${PUBLIC_DOMAIN:?PUBLIC_DOMAIN заавал (жишээ нь medreh.example.com)}"
: "${LETSENCRYPT_EMAIL:?LETSENCRYPT_EMAIL заавал (Let's Encrypt-ийн мэдэгдэл авах имэйл)}"

COMPOSE_PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$COMPOSE_PROJECT_DIR"
COMPOSE_FILES=(-f docker-compose.yml -f docker-compose.tls.yml)

echo "1/3: certbot/nginx-ийн эзэмшдэг volume-уудыг үүсгэж, түр зуурын HTTP-ONLY nginx-ээр ACME challenge зам нээнэ..."
docker compose "${COMPOSE_FILES[@]}" up -d certbot

# ACME challenge (/.well-known/acme-challenge/) хариулах зорилготой хамгийн энгийн,
# сертификатгүй nginx-ийг зөвхөн энэ нэг удаагийн бэлтгэлд түр ажиллуулна.
docker run --rm -d --name medreh-tls-bootstrap \
  --network "$(basename "$COMPOSE_PROJECT_DIR")_default" \
  -p 80:80 \
  -v "$(docker volume ls -qf name=certbot-www | tail -1):/var/www/certbot:ro" \
  nginx:1.27-alpine \
  sh -c 'echo "server { listen 80; location /.well-known/acme-challenge/ { root /var/www/certbot; } location / { return 200 \"ok\"; } }" > /etc/nginx/conf.d/default.conf && nginx -g "daemon off;"'

echo "2/3: Let's Encrypt сертификат хүсэж байна ($PUBLIC_DOMAIN)..."
docker compose "${COMPOSE_FILES[@]}" run --rm certbot \
  certonly --webroot -w /var/www/certbot \
  -d "$PUBLIC_DOMAIN" \
  --email "$LETSENCRYPT_EMAIL" --agree-tos --no-eff-email

docker stop medreh-tls-bootstrap >/dev/null 2>&1 || true

echo "3/3: бүрэн stack-ийг (nginx-тэй) эхлүүлж байна..."
docker compose "${COMPOSE_FILES[@]}" up -d --build

echo "Дууслаа — https://$PUBLIC_DOMAIN шалгана уу. Сертификат сунгалт (renew) certbot service-ээр автоматаар (12ц тутам) шалгагдана."
