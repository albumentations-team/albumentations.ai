import { Metadata } from 'next'
import { generateMetadata } from '@/lib/metadata'
import HeroSection from '@/app/components/HeroSection'
import Features from '@/app/components/Features'
import IndustryUsers from '@/app/components/IndustryUsers'
import GettingStarted from '@/app/components/GettingStarted'
import Support from '@/app/components/Support'
import Citation from '@/app/components/Citation'
import { getGitHubStats } from '@/lib/github'
// import { getDownloadsCount } from '@/lib/download'

export const metadata: Metadata = generateMetadata()

export default async function HomePage() {
  const { starsCount } = await getGitHubStats()
  // const downloadsCount = await getDownloadsCount()

  return (
    <main>
      <HeroSection
        starsCount={starsCount}
        downloadsCount={0}
      />
      <IndustryUsers />
      <Features />
      <GettingStarted />
      <Support />
      <Citation />
    </main>
  )
}
