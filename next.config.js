/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'cms.withwingsandroots.org',
      },
      {
        hostname: 'wwar2022.backslashseven.com',
      },
    ],
  },
};
