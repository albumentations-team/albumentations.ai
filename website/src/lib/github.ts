import { cache } from 'react'

interface GitHubStats {
  starsCount: number
  forksCount: number
}

export const getGitHubStats = cache(async (): Promise<GitHubStats> => {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN is required')
  }

  const response = await fetch(
    'https://api.github.com/repos/albumentations-team/albumentations',
    {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch GitHub stats')
  }

  const data = await response.json()

  return {
    starsCount: data.stargazers_count,
    forksCount: data.forks_count,
  }
})
