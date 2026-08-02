# syntax=docker/dockerfile:1

# ---------- build stage ----------
FROM node:20-alpine AS build
WORKDIR /app

# Prisma-ийн query engine Alpine-д зориулсан OpenSSL шаардана.
RUN apk add --no-cache openssl

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY prisma ./prisma
RUN npx prisma generate

COPY . .
RUN npm run build

# ---------- production stage ----------
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

RUN apk add --no-cache openssl \
  && addgroup -S medreh && adduser -S medreh -G medreh

COPY package.json package-lock.json ./
RUN npm ci --omit=dev --legacy-peer-deps

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/node_modules/@prisma ./node_modules/@prisma
# `prisma` CLI-г build stage-ээс (devDependencies-тэй хамт аль хэдийн бодитоор
# суусан) шууд хуулж авна — production stage дотор дахин суулгах гэж оролдоход
# npm "up to date" гэж худал дүгнэж бодит файл бичдэггүй асуудал тулгарсан.
# `node_modules/.bin/prisma` symlink-ийг ганцаараа хуулбал зэргэлдээх .wasm файлаа
# алддаг тул `node_modules/prisma` бүхэлд нь хуулж, ENTRYPOINT доор build/index.js-ийг
# шууд дуудна (.bin symlink-ийг тойрч).
COPY --from=build /app/node_modules/prisma ./node_modules/prisma
COPY prisma ./prisma

# Score/legacy файлын статик serving-д зориулсан хавтас (main.ts:
# app.useStaticAssets(uploads/)) — контейнер дотор зөвхөн Haptic Score JSON-д
# ашиглагдана, аудио/ковер MinIO-д (см. StorageService).
RUN mkdir -p uploads/scores && chown -R medreh:medreh /app

USER medreh
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/api/health || exit 1

# Контейнер эхлэх бүрт хамгийн эхэнд шинэ migration-уудыг DB-д хэрэглэнэ
# (`prisma migrate deploy` — dev горимын `migrate dev`-ээс ялгаатай, зөвхөн
# аль хэдийн бичигдсэн migration файлуудыг ажиллуулна, prompt-гүй, CI/CD-д зориулагдсан).
# `npx prisma` БИШ node_modules/prisma/build/index.js шууд дуудна — npx нь локал
# суулгасан хувилбарыг үл тоож сүлжээнээс хамгийн сүүлийн (major өөр, эвдэрсэн)
# хувилбар татаж болзошгүй, харин .bin/prisma symlink ганцаараа зэргэлдээх
# .wasm файлаа алддаг тул шууд build/index.js-ийг дуудна.
ENTRYPOINT ["sh", "-c", "node node_modules/prisma/build/index.js migrate deploy && node dist/main"]
