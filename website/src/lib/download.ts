import { cache } from 'react'

export const getDownloadsCount = cache(async (): Promise<number> => {
  const response = await fetch(
    'https://api.clickhouse.com/v1/albumentations/downloads/last-30-days',
    {
      next: { revalidate: 3600 }, // Cache for 1 hour
    }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch download stats')
  }

  const data = await response.json()
  return data.downloads
})
