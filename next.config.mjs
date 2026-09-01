/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  // If backend is run as standalone server on port 5000 in dev mode, rewrites can route /api to it
  async rewrites() {
    if (process.env.USE_STANDALONE_BACKEND === 'true') {
      return [
        {
          source: '/api/:path*',
          destination: `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/:path*`,
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
