'use client'

import React, { useState } from 'react'
import { Section } from './Section'

export default function WhySection() {
  const [isTooltipVisible, setTooltipVisible] = useState(false)

  const benchmarkUrl = "https://albumentations.ai/docs/benchmarking_results/"

  return (
    <Section
      title="Why Albumentations"
      background="light"
    >
      <div className="max-w-5xl mx-auto">
        {/* Main Value Proposition */}
        <p className="text-2xl text-center text-gray-700 mb-12 leading-relaxed">
          The fastest and most flexible image augmentation library,
          trusted by thousands of AI engineers and researchers worldwide
        </p>

        {/* Key Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6">
            <div className="text-blue-600 text-3xl mb-4">
              <i className="fas fa-bolt" />
            </div>
            <h3 className="text-xl font-medium mb-3">Lightning Fast</h3>
            <p className="text-gray-600">
              Up to 10x faster than other libraries.{' '}
              <a href={benchmarkUrl} className="text-blue-600 hover:underline">
                See benchmarks
              </a>
            </p>
          </div>

          <div className="text-center p-6">
            <div className="text-blue-600 text-3xl mb-4">
              <i className="fas fa-puzzle-piece" />
            </div>
            <h3 className="text-xl font-medium mb-3">Versatile</h3>
            <p className="text-gray-600">
              Supports classification, segmentation, detection, and more tasks out of the box
            </p>
          </div>

          <div className="text-center p-6">
            <div className="text-blue-600 text-3xl mb-4">
              <i className="fas fa-code" />
            </div>
            <h3 className="text-xl font-medium mb-3">Easy to Use</h3>
            <p className="text-gray-600">
              Simple, intuitive API with comprehensive documentation and examples
            </p>
          </div>
        </div>

        {/* Technical Description */}
        <div className="text-lg text-gray-700 leading-relaxed bg-white rounded-xl p-8 shadow-sm">
          <p className="mb-4">
            Albumentations is a Python library for{' '}
            <span
              className="relative inline-block group"
              onMouseEnter={() => setTooltipVisible(true)}
              onMouseLeave={() => setTooltipVisible(false)}
            >
              <span className="border-b-2 border-dotted border-blue-600 cursor-help">
                image augmentations
              </span>

              {/* Tooltip */}
              {isTooltipVisible && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-96 p-4 bg-gray-900 text-white text-base rounded-lg shadow-lg z-10">
                  Data augmentation is a commonly used technique for increasing both the size and the diversity of labeled training sets by leveraging input transformations that preserve output labels. In computer vision, image augmentations have become a common regularization technique to combat overfitting in deep convolutional neural networks and are ubiquitously used to improve performance on various tasks.
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                </div>
              )}
            </span>
            {' '}that provides:
          </p>

          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Optimized performance for production environments</li>
            <li>Rich variety of transform operations</li>
            <li>Support for all major computer vision tasks</li>
            <li>Seamless integration with PyTorch, TensorFlow, and other frameworks</li>
          </ul>
        </div>

        {/* Benchmark CTA */}
        <div className="text-center mt-8">
          <a
            href={benchmarkUrl}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            Compare Albumentations with other libraries
            <i className="fas fa-arrow-right" />
          </a>
        </div>
      </div>
    </Section>
  )
}
