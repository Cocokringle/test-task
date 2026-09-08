import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ac.goit.global',
        pathname: '/car-rental-task/**',
      },
    ],
  },
}

export default nextConfig
