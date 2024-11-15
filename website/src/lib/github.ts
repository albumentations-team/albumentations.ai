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

export type Contributor = {
  login: string
  avatar_url: string
  contributions: number
  html_url: string
}

export async function getContributors(): Promise<Contributor[]> {
  const perPage = 100
  let page = 1
  let allContributors: Contributor[] = []

  while (true) {
    const res = await fetch(
      `https://api.github.com/repos/albumentations-team/albumentations/contributors?per_page=${perPage}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
        next: { revalidate: 3600 }
      }
    )

    if (!res.ok) {
      throw new Error('Failed to fetch contributors')
    }

    const contributors = await res.json()

    if (contributors.length === 0) {
      break
    }

    allContributors = [...allContributors, ...contributors]

    if (contributors.length < perPage) {
      break
    }

    page++
  }

  return allContributors
}
