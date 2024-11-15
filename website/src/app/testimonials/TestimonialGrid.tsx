import Masonry from 'react-masonry-css'

import type { Testimonial } from './types'
import { TestimonialItem } from './TestimonialItem'

interface TestimonialGridProps {
  testimonials: Testimonial[]
  onImageSelect: (imageUrl: string) => void
  onImageLoad: (imageUrl: string) => void
  loadedImages: Set<string>
}

const breakpointColumns = {
  default: 3,
  1100: 3,
  700: 2,
  500: 1
}

export function TestimonialGrid({ testimonials, onImageSelect, onImageLoad, loadedImages }: TestimonialGridProps) {
  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="masonry-grid"
      columnClassName="masonry-grid_column"
    >
      {testimonials.map((testimonial) => (
        <TestimonialItem
          key={testimonial.imageUrl}
          testimonial={testimonial}
          onImageSelect={onImageSelect}
          onImageLoad={onImageLoad}
          isLoaded={loadedImages.has(testimonial.imageUrl)}
        />
      ))}
    </Masonry>
  )
}
