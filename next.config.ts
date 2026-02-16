import type { NextConfig } from 'next'

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  experimental: {
    // Required to enable the "use cache" directive per documentation
    cacheComponents: true,
    // Optional: Configure custom cache handlers if needed
    cacheHandlers: {},
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
}

export default nextConfig