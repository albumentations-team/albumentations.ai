'use client'

import { useState } from 'react'
import Image from 'next/image'
import { testimonials } from '../data/testimonials'

export default function TestimonialsGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.imageUrl}
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
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              className="absolute -top-12 right-0 text-white text-xl hover:text-gray-300"
              onClick={() => setSelectedImage(null)}
            >
              <i className="fas fa-times" />
            </button>
            <div className="relative group">
              <Image
                src={selectedImage}
                alt="Enlarged testimonial"
                width={1200}
                height={800}
                className="w-full h-auto transition-transform duration-200 ease-in-out transform group-hover:scale-95"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedImage(null)
                }}
              />
              {/* Zoom out indicator */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-black/75 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                  <i className="fas fa-search-minus" />
                  <span>Click to close</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
