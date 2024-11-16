'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { formatNumber } from '@/lib/format'

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

          <div className="text-lg mb-8">
            <p className="mb-4">
              Albumentations is a computer vision tool that boosts the performance of
              deep convolutional neural networks.
            </p>
            <p>
            The library is widely used in industry, deep learning research, machine learning competitions, and open source projects.
            </p>
          </div>

          <div className="flex flex-col gap-4 max-w-xl">
            {/* Stats Buttons Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Downloads Button */}
              <a
                href="https://clickpy.clickhouse.com/dashboard/albumentations"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-stats group"
              >
                <span className="flex items-center gap-2">
                  <i className="fas fa-download text-gray-500 group-hover:text-gray-700" />
                  Downloads (last 30 days)
                </span>
                <span className="border-l pl-4 font-medium">
                  {formatNumber(downloadsCount)}
                </span>
              </a>

              {/* GitHub Button */}
              <a
                href="https://github.com/albumentations-team/albumentations"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-stats group"
              >
              <span className="flex items-center gap-2">
                <i className="fab fa-github text-gray-500 group-hover:text-gray-700" />
                Star on GitHub
              </span>
                <span className="border-l pl-4 font-medium">
                  <i className="fa fa-star mr-1" />
                  {formatNumber(starsCount)}
                </span>
              </a>
            </div>

            {/* Documentation Button */}
            <Link
              href="/docs"
              className="btn-primary text-center"
            >
              Open documentation
            </Link>
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="relative">
            <Image
              src="/assets/top_image.jpg"
              alt="Albumentations example"
              width={350}
              height={350}
              className="w-full h-auto rounded-lg shadow-lg"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}
