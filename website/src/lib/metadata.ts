import { type Metadata } from 'next'

interface GenerateMetadataProps {
  title?: string
  description?: string
  path?: string
}

export function generateMetadata({
  title,
  description,
  path = '',
}: GenerateMetadataProps = {}): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://albumentations.ai'
  const fullUrl = `${baseUrl}${path}`

  const defaultTitle = 'Albumentations: fast and flexible image augmentations'
  const defaultDescription = 'Albumentations provides a comprehensive, high-performance framework for augmenting images to improve machine learning models.'

  return {
    title: title ? `${title} | Albumentations` : defaultTitle,
    description: description || defaultDescription,
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: title || defaultTitle,
      description: description || defaultDescription,
      url: fullUrl,
      siteName: 'Albumentations',
      images: [
        {
          url: "assets/albumentations_card.png",
          width: 1200,
          height: 630,
          alt: 'Albumentations',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@albumentations',
      creator: '@viglovikov',
      title: title || defaultTitle,
      description: description || defaultDescription,
      images: ["assets/albumentations_card.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: fullUrl,
    },
  }
}
