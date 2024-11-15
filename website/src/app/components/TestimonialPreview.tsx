'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Section } from './Section'

import { featuredTestimonials } from '@/app/data/testimonials'

export default function TestimonialsPreview() {
  return (
    <Section title="Community Feedback" background="light">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {featuredTestimonials.map((testimonial) => (
          <div
            key={testimonial.imageUrl}
            className="space-y-3"
          >
            {/* Image container */}
            <div className="relative group">
              <Image
                src={testimonial.imageUrl}
                alt="Community feedback"
                width={400}
                height={300}
                className="rounded-lg shadow-sm"
              />

              {/* Social link */}
              <a
                href={testimonial.socialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <i className={`fab fa-${testimonial.platform} text-white text-xl`} />
              </a>
            </div>

            {/* Role/Note */}
            <div className="flex items-center gap-2">
              <i className={`fab fa-${testimonial.platform} text-gray-400 text-lg`} />
              <span className="text-gray-600 font-medium">
                {testimonial.note}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/testimonials"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium group"
        >
          View more feedback
          <i className="fas fa-arrow-right transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </Section>
  )
}
