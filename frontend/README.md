This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

> **Порт 3001.** Backend (NestJS) нь 3000-г эзэлдэг тул frontend 3001 дээр ажиллана
> — `npm run dev` үүнийг автоматаар зааж өгнө (`next dev -p 3001`). Порт 3000 дээр
> асаавал backend `EADDRINUSE`-ээр унана. Мөн `backend/.env`-ийн
> `CORS_ORIGIN=http://localhost:3001` энэ порттой тохирсон байх ёстой.

API хүсэлтүүд `/api/*` рүү явж, [next.config.ts](next.config.ts)-ийн rewrite-аар
backend руу дамждаг тул локал хөгжүүлэлтэд `.env` файл шаардлагагүй. Google-ээр
нэвтрэх товчийг идэвхжүүлэх бол `.env.local`-д `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
нэмнэ (см. [docs/ENV-MISSING-KEYS-GUIDE.md](../docs/ENV-MISSING-KEYS-GUIDE.md)).

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
