/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  typescript: {
    // !! WARNING: This ignores build errors for TypeScript. Use with caution.
    ignoreBuildErrors: true, 
  },
  eslint: {
    // !! WARNING: This ignores linting errors during the build. Use with caution.
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

// Use module.exports for CommonJS
module.exports = nextConfig;