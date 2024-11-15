'use client'

import { useState } from 'react'
import { testimonials } from '../data/testimonials'
import { TestimonialGrid } from './TestimonialGrid'
import { ImageModal } from './ImageModal'

export default function TestimonialsGallery() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())

    const handleImageLoad = (imageUrl: string) => {
      setLoadedImages(prev => new Set(prev).add(imageUrl))
    }

    return (
      <>
        <TestimonialGrid
          testimonials={testimonials}
          onImageSelect={setSelectedImage}
          onImageLoad={handleImageLoad}
          loadedImages={loadedImages}
        />

        {selectedImage && (
          <ImageModal
            imageUrl={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </>
    )
}
