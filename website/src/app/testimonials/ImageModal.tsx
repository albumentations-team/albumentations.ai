import Image from 'next/image'
import { CloseButton } from './CloseButton'
import { ZoomOutIndicator } from './ZoomOutIndicator'

interface ImageModalProps {
  imageUrl: string
  onClose: () => void
}

export function ImageModal({ imageUrl, onClose }: ImageModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-zoom-out"
      onClick={onClose}
    >
      <div className="relative max-w-4xl w-full">
        <CloseButton onClick={onClose} />
        <div className="relative group">
          <Image
            src={imageUrl}
            alt="Enlarged testimonial"
            width={1200}
            height={800}
            className="w-full h-auto transition-transform duration-200 ease-in-out transform group-hover:scale-95"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
          />
          <ZoomOutIndicator />
        </div>
      </div>
    </div>
  )
}
