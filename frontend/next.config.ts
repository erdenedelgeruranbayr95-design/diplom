import type { NextConfig } from "next";

// Docker/production-д backend өөр host дээр байрлаж болно (docker-compose дотор
// `http://api:3000`) — локал хөгжүүлэлтэд өмнөх адил localhost:3000 үлдэнэ.
const API_ORIGIN = process.env.BACKEND_INTERNAL_URL || "http://localhost:3000";

// Next нь package-lock.json-оор workspace root-ыг таамагладаг. Хөгжүүлэгчийн home
// хавтсанд (жиш. C:\Users\<nэр>\package-lock.json) санамсаргүй lockfile үүссэн бол
// түүнийг root гэж андуурч, `output: "standalone"` build-д буруу файлуудыг мөрддөг.
// Энэ хавтсыг тодорхой зааж өгснөөр гадны lockfile-аас үл хамаарна.
const TRACING_ROOT = __dirname;

// Capacitor Android build (см. docs/CAPACITOR-ANDROID-SETUP.md) статик HTML/JS
// (`output: "export"`) шаардана — сервер талын rewrites/standalone дэмждэггүй.
// Энгийн `next build` (Docker/web) горим бол өмнөх адил "standalone" хэвээр
// үлдэнэ, зөвхөн `CAPACITOR_BUILD=1 next build`-ээр л export горимд шилждэг.
const isCapacitorBuild = process.env.CAPACITOR_BUILD === "1";

const nextConfig: NextConfig = isCapacitorBuild
  ? {
      // Static export → `out/` — `npx cap sync android` энэ хавтасыг Android
      // project руу хуулна. rewrites ажиллахгүй тул `lib/api/client.ts`
      // NEXT_PUBLIC_API_URL-ээр шууд production backend домэйн руу хандана
      // (build хийхийн өмнө .env.local/.env.production-д тохируулна уу).
      output: "export",
      images: { unoptimized: true },
      outputFileTracingRoot: TRACING_ROOT,
    }
  : {
      outputFileTracingRoot: TRACING_ROOT,
      // Docker image-ийг хамгийн бага хэмжээтэй болгоно — зөвхөн ажиллахад
      // шаардлагатай файлуудыг (`.next/standalone`) багтаана.
      output: "standalone",
      async rewrites() {
        return [
          {
            source: "/api/:path*",
            destination: `${API_ORIGIN}/api/:path*`,
          },
          {
            source: "/uploads/:path*",
            destination: `${API_ORIGIN}/uploads/:path*`,
          },
        ];
      },
    };

export default nextConfig;
