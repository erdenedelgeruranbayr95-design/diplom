# Vercel + Render + Neon deployment (Монгол хэлээр)

Энэ төсөл нь дараах бүтэцтэй ажиллахад бэлэн:
- Frontend: Next.js -> Vercel
- Backend: NestJS -> Render
- Database: Neon PostgreSQL

## 1. Neon database үүсгэх

1. Neon dashboard руу орно.
2. New Project -> Database үүсгэнэ.
3. Connection string-ийг авна.
4. Connection string-ийг дараах маягтаар хадгална:

```text
postgresql://<user>:<password>@<host>/<db>?sslmode=require
```

## 2. Render дээр backend deploy хийх

1. Render account үүсгээд GitHub repo холбох.
2. New + Web Service -> энэ repository сонгоно.
3. Root Directory-г repo root болгоно.
4. Render файл автоматаар ажиллах тул build/start command шаардлагагүй.
5. Environment Variables-д дараах утгуудыг оруулна:

```text
NODE_ENV=production
PORT=10000
DATABASE_URL=postgresql://...your-neon-url...
JWT_ACCESS_SECRET=жижигхэн-санамсаргүй-утга
COOKIE_SECRET=жижигхэн-санамсаргүй-утга
HAPTIC_CALLBACK_SECRET=жижигхэн-санамсаргүй-утга
PAYMENT_WEBHOOK_SECRET=жижигхэн-санамсаргүй-утга
HEARING_PROFILE_ENC_KEY=жижигхэн-санамсаргүй-утга
CORS_ORIGIN=https://таны-frontend-domain.vercel.app
S3_ENDPOINT=https://your-s3-endpoint
S3_REGION=us-east-1
S3_BUCKET=medreh-media
S3_ACCESS_KEY=your-access-key
S3_SECRET_KEY=your-secret-key
S3_PUBLIC_URL=https://your-s3-endpoint/medreh-media
GOOGLE_CLIENT_ID=your-google-client-id
SENTRY_DSN=
```

6. Deploy дээрээ backend health шалгах URL:

```text
https://таны-render-backend-url/api/health
```

Хэрэв `{ "ok": true }` буцаавал backend зөв ажиллаж байна.

## 3. Vercel дээр frontend deploy хийх

1. Vercel dashboard -> Add New Project.
2. Энэ repository-оос frontend хавтсыг сонгоно.
3. Root Directory-г frontend болгоно.
4. Framework preset-ийг Next.js гэж сонгоно.
5. Environment Variables-д дараах утгуудыг нэмнэ:

```text
NEXT_PUBLIC_API_URL=https://таны-render-backend-url/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
```

6. Deploy хийсний дараа Vercel URL-ээ авна.

## 4. CORS болон frontend URL тохируулах

Backend-д `CORS_ORIGIN`-д Vercel frontend домэйнээ оруулах хэрэгтэй.

Жишээ:

```text
CORS_ORIGIN=https://medreh-app.vercel.app
```

## 5. Prisma migration ажиллуулах

Render дээр автоматаар migration ажиллана. Хэрэв localhost-аас шалгах шаардлагатай бол:

```bash
cd backend
npx prisma migrate deploy
npx prisma generate
```

## 6. Final check-list

- [ ] Neon database connection string зөв байна
- [ ] Render backend deploy амжилттай боллоо
- [ ] `/api/health` ажиллаж байна
- [ ] Vercel frontend deploy амжилттай боллоо
- [ ] `NEXT_PUBLIC_API_URL` зөв байна
- [ ] `CORS_ORIGIN` Vercel domain-тай тохирч байна
- [ ] Google OAuth domain-ууд Vercel/Render-д нэмэгдсэн

## 7. Хэрэв алдаа гарвал

- `PrismaClientInitializationError` -> DATABASE_URL буруу эсвэл Neon SSL тохиргоо алга.
- `CORS` алдаа -> backend `CORS_ORIGIN`-д Vercel домэйн оруулаагүй.
- `401/403` -> refresh/access token config буруу.
- Frontend API дуудлага ажиллахгүй -> `NEXT_PUBLIC_API_URL`-г `/api`-тай зөв оруулсан эсэх.
