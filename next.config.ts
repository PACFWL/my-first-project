import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

console.log("NEXT_PUBLIC_API_URL carregado:", process.env.NEXT_PUBLIC_API_URL);

module.exports = nextConfig;