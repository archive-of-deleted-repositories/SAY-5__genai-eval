import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: fileURLToPath(new URL(".", import.meta.url)),
  reactStrictMode: true,
  output: "standalone",
  env: {
    GENAI_EVAL_API_URL: process.env.GENAI_EVAL_API_URL || "http://localhost:8000",
  },
};

export default nextConfig;
