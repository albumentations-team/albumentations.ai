import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

// Get repository name from environment or default to 'albumentations'
const repoName = process.env.REPOSITORY_NAME || 'albumentations';

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'build',
  basePath: isGitHubPages ? `/${repoName}` : '',
  assetPrefix: isGitHubPages ? `/${repoName}/` : '/',
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
