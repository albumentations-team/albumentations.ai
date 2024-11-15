import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

// Site is served at the root domain
const baseURL = 'https://albumentations.ai';

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'build',
  basePath: '',  // No base path needed since it's served at root
  assetPrefix: isGitHubPages ? baseURL : '',  // Use full domain in production
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
