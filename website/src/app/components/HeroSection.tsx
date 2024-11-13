import { formatNumber } from "@/lib/format"
import Image from 'next/image'

interface HeroSectionProps {
  starsCount: number
  downloadsCount: number
}

export default function HeroSection({ starsCount, downloadsCount }: HeroSectionProps) {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-7">
          <h1 className="text-4xl font-medium mb-6">
            Do more with less data
          </h1>

          <div className="text-lg mb-8" id="hero-block">
            <p className="mb-4">
              Albumentations is a computer vision tool that boosts the performance of
              deep convolutional neural networks.
            </p>
            {/* ... rest of the text ... */}
          </div>

          <div className="space-y-4">
            <a
              href="https://clickpy.clickhouse.com/dashboard/albumentations"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-stats"
            >
              <span>
                <i className="fas fa-download" /> Downloads (last 30 days)
              </span>
              <span className="border-l px-4">
                {formatNumber(downloadsCount)}
              </span>
            </a>

            <a
              href="https://github.com/albumentations-team/albumentations"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-stats"
            >
              <span>
                <i className="fab fa-github" /> View on GitHub
              </span>
              <span className="border-l px-4">
                <i className="fa fa-star" /> {formatNumber(starsCount)}
              </span>
            </a>

            <a href="/docs" className="btn-primary block text-center">
              Open documentation
            </a>
          </div>
        </div>

        <div className="md:col-span-5">
          <Image
            src="/assets/img/custom/top_image.jpg"
            alt="Albumentations example"
            width={350}
            height={350}
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
}
