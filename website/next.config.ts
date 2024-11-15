import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const repoName = process.env.REPOSITORY_NAME || 'albumentations';

// Get the base URL for assets
const baseURL = isGitHubPages
  ? `https://albumentations.ai/${repoName}`  // Production URL
  : '';

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'build',
  basePath: isGitHubPages ? `/${repoName}` : '',
  assetPrefix: baseURL,  // Use full URL in production
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
