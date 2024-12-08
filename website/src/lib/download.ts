import { unstable_cache } from 'next/cache'

export const getDownloadsCount = unstable_cache(async (): Promise<number> => {
  const response = await fetch(
    'https://pypistats.org/api/packages/albumentations/recent',
    {
      next: { revalidate: 3600 }, // Cache for 1 hour
    }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch download stats')
  }
  const data = await response.json()

  return data.data.last_month
})
