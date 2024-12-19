import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        pathname: "/dl5irqaz6/**",
      },
    ],
  },
};

export default nextConfig;
