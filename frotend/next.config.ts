import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3010/api/:path*",
      },
      {
        source: "/uploads/:path*",
        destination: "http://localhost:3010/uploads/:path*",
      },
    ];
  },
};

export default nextConfig;
