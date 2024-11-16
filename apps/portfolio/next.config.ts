import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

export default withPWAInit({ dest: "public", register: true, scope: "/app" })({
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: false },
  typescript: { ignoreBuildErrors: false, tsconfigPath: "./tsconfig.json" },
  images: {
    loader: "default",
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        hostname: "localhost",
        port: "3001",
        protocol: "http"
      },
      { hostname: "images.unsplash.com", protocol: "https" },
      { hostname: "tailwindui.com", protocol: "https" },
      {
        hostname: "turbogen-portfolio.vercel.app",
        protocol: "https"
      },
      { hostname: "dev-to-uploads.s3.amazonaws.com", protocol: "https" },
      {
        hostname: "ypuktmwmnilhirdf.public.blob.vercel-storage.com",
        protocol: "https",
        port: ""
      },
      {
        hostname: "andrewross.dev",
        protocol: "https"
      },
      {
        hostname: "andrewross.wtf",
        protocol: "https"
      },
      {
        hostname: "andrewross.tech",
        protocol: "https"
      }
    ]
  },
  productionBrowserSourceMaps: true
} satisfies NextConfig);
