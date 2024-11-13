import { generateMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'
import TestimonialsGallery from './TestimonialGallery'

export const metadata: Metadata = generateMetadata({
  title: 'Community Testimonials',
  description: 'Real feedback from the Albumentations community',
})

export default function TestimonialsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-medium text-center mb-12">
        Community Feedback
      </h1>
      <TestimonialsGallery />
    </div>
  )
}
