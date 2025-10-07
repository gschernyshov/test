import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      resolveAlias: {
        // 👉 Говорим Turbopack:
        // если кто-то импортирует "@prisma/client",
        // используй сгенерированный клиент из src/generated/prisma
        "@prisma/client": "./src/generated/prisma",
      },
    },
  },
};

export default nextConfig;
