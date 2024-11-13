'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Section } from './Section'

// Show just 3-4 most impactful screenshots
const featuredTestimonials = [
  {
    id: 1,
    imageUrl: '/assets/testimonials/tweet1.png',
    socialUrl: 'https://twitter.com/username/status/123',
    platform: 'twitter'
  },
  // ... 2-3 more
]

export default function TestimonialsPreview() {
  return (
    <Section title="Community Feedback" background="light">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {featuredTestimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="relative group"
          >
            <Image
              src={testimonial.imageUrl}
              alt="Community feedback"
              width={400}
              height={300}
              className="rounded-lg shadow-sm"
            />

            <a
              href={testimonial.socialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <i className={`fab fa-${testimonial.platform} text-white text-xl`} />
            </a>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/testimonials"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          View more feedback
          <i className="fas fa-arrow-right ml-2" />
        </Link>
      </div>
    </Section>
  )
}
