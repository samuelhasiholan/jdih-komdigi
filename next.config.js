/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    output: 'standalone',
    env: {
        NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_RECAPTCHA_SITE_KEY:
            process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    },
    basePath: process.env.NEXT_PUBLIC_BASE_URL,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'jdih.kominfo.go.id',
                port: '',
                pathname: '/storage/**',
            },
        ],
    },
}

module.exports = nextConfig
