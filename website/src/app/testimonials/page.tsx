'use client'

import { useState } from 'react'
import Image from 'next/image'
import { generateMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'

// You can move this to constants
const testimonials = [
  {
    id: 1,
    imageUrl: '/assets/testimonials/tweet1.png',
    socialUrl: 'https://twitter.com/username/status/123', // original post URL
    platform: 'twitter'  // or 'linkedin', etc.
  },
  // ... more testimonials
]

export const metadata: Metadata = generateMetadata({
  title: 'Community Testimonials',
  description: 'Real feedback from the Albumentations community',
})

export default function TestimonialsPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-medium text-center mb-12">
        Community Feedback
      </h1>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="relative group cursor-zoom-in"
            onClick={() => setSelectedImage(testimonial.imageUrl)}
          >
            <Image
              src={testimonial.imageUrl}
              alt="Community feedback"
              width={400}
              height={300}
              className="rounded-lg shadow-sm hover:shadow-md transition-shadow"
            />

            {/* Hover overlay with platform icon */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
              <i className={`fab fa-${testimonial.platform} text-white text-2xl`} />
            </div>

            {/* Link to original post */}
            <a
              href={testimonial.socialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <i className="fas fa-external-link-alt" />
            </a>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              className="absolute -top-12 right-0 text-white text-xl hover:text-gray-300"
              onClick={() => setSelectedImage(null)}
            >
              <i className="fas fa-times" />
            </button>
            <Image
              src={selectedImage}
              alt="Enlarged testimonial"
              width={1200}
              height={800}
              className="w-full h-auto"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  )
}
