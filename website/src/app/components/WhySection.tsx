'use client'

import React, { useState } from 'react'
import { Section } from './Section'

export default function WhySection() {
  const [isTooltipVisible, setTooltipVisible] = useState(false)

  return (
    <Section
      title="Why Albumentations"
      background="light"
    >
      <div className="max-w-4xl mx-auto text-lg text-gray-700 text-center leading-relaxed">
        Albumentations is a Python library for fast and flexible{' '}
        <span
          className="relative inline-block group"
          onMouseEnter={() => setTooltipVisible(true)}
          onMouseLeave={() => setTooltipVisible(false)}
        >
          <span className="border-b border-dotted border-blue-600 cursor-help">
            image augmentations
          </span>

          {/* Tooltip */}
          {isTooltipVisible && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-10">
              Data augmentation is a commonly used technique for increasing both the size and the diversity of labeled training sets by leveraging input transformations that preserve output labels. In computer vision, image augmentations have become a common regularization technique to combat overfitting in deep convolutional neural networks and are ubiquitously used to improve performance on various tasks.
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" />
            </div>
          )}
        </span>
        . Albumentations efficiently implements a rich variety of image transform operations that are optimized for performance, and does so while providing a concise, yet powerful image augmentation interface for different computer vision tasks, including object classification, segmentation, and detection.
      </div>
    </Section>
  )
}
