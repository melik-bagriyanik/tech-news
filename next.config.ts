import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.dev.to' },
      { protocol: 'https', hostname: 'dev-to-uploads.s3.amazonaws.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'secure.gravatar.com' },
    ],
  },
};

export default nextConfig;
