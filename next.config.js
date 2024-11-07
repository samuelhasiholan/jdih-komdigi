/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "standalone",
  env: {
    NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.jakarta.go.id",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s3-jaki-dev.jakarta.go.id",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "disperkim.madiunkota.go.id",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
