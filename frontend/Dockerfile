# syntax=docker/dockerfile:1

FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY . .
# `NEXT_PUBLIC_*` хувьсагчид Next.js build-ийн үед клиент bundle-д bake хийгддэг
# (runtime env биш) тул build ARG-аар дамжуулна — docker-compose.yml-ийн
# `build.args`-аар тохируулна, тохируулаагүй бол хоосон (Google товч харагдахгүй).
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID=
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=$NEXT_PUBLIC_GOOGLE_CLIENT_ID
# Build-ийн үед backend хаана ч байх нь хамаагүй — rewrites() зөвхөн runtime-д
# хэрэглэгддэг тул build-ийн default (localhost:3000) хамаагүй.
RUN npm run build

# ---------- production stage ----------
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup -S medreh && adduser -S medreh -G medreh

# `output: "standalone"` (next.config.ts) — зөвхөн ажиллахад шаардлагатай
# файлуудыг агуулсан хамгийн бага хэмжээтэй гаралт.
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

USER medreh
EXPOSE 3001
ENV PORT=3001
# Next.js standalone server.js нь HOSTNAME зааж өгөхгүй бол container-ийн өөрийн IP
# дээр binding хийдэг (0.0.0.0/localhost биш) — healthcheck "Connection refused"
# өгдөг байсныг эндээс олж тогтоов.
ENV HOSTNAME=0.0.0.0
# `localhost` Alpine дотор заримдаа эхлээд ::1 (IPv6) рүү resolve хийгээд бүтэлгүйтдэг
# (сервер зөвхөн IPv4 дээр сонсдог) тул 127.0.0.1-ыг шууд заана.
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3001/ || exit 1

CMD ["node", "server.js"]
