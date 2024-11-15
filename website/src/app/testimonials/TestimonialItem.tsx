import Image from 'next/image'
import { SocialOverlay } from './SocialOverlay'
import { Testimonial } from './types'
import { ExternalLink } from './ExternalLink'


interface TestimonialItemProps {
  testimonial: Testimonial
  onImageSelect: (imageUrl: string) => void
  onImageLoad: (imageUrl: string) => void
  isLoaded: boolean
}

export function TestimonialItem({ testimonial, onImageSelect, onImageLoad, isLoaded }: TestimonialItemProps) {
  return (
    <div
      className="masonry-grid_item mb-4 opacity-0"
      style={{
        animationDelay: `${isLoaded ? '0s' : '0.1s'}`
      }}
    >
      <div
        className="relative group cursor-zoom-in"
        onClick={() => onImageSelect(testimonial.imageUrl)}
      >
        <Image
          src={testimonial.imageUrl}
          alt="Community feedback"
          width={400}
          height={300}
          className="rounded-lg shadow-sm hover:shadow-md transition-shadow w-full"
          onLoad={() => onImageLoad(testimonial.imageUrl)}
          sizes="(max-width: 500px) 100vw, (max-width: 700px) 50vw, 33vw"
        />

        <SocialOverlay platform={testimonial.platform} />
        <ExternalLink url={testimonial.socialUrl} />
      </div>
    </div>
  )
}
