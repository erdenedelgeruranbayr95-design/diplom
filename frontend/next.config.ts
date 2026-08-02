import type { NextConfig } from "next";

// Docker/production-д backend өөр host дээр байрлаж болно (docker-compose дотор
// `http://api:3000`) — локал хөгжүүлэлтэд өмнөх адил localhost:3000 үлдэнэ.
const API_ORIGIN = process.env.BACKEND_INTERNAL_URL || "http://localhost:3000";

const nextConfig: NextConfig = {
  // Docker image-ийг хамгийн бага хэмжээтэй болгоно — зөвхөн ажиллахад шаардлагатай
  // файлуудыг (`.next/standalone`) багтаана, бүтэн node_modules-гүйгээр.
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
