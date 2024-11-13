import React from 'react'
import Image from 'next/image'
import { Section } from '@/app/components/Section'

interface Feature {
  title: string
  description: string
  image: string
  imageAlt: string
  reverse: boolean
}

const features: Feature[] = [
  {
    title: 'Different tasks',
    description: 'Albumentations supports different computer vision tasks such as classification, semantic segmentation, instance segmentation, object detection, and pose estimation.',
    image: '/assets/custom/tasks.png',
    imageAlt: 'Computer vision tasks',
    reverse: false,
  },
  {
    title: 'Different domains',
    description: 'Albumentations works well with data from different domains: photos, medical images, satellite imagery, manufacturing and industrial applications, Generative Adversarial Networks.',
    image: '/assets/custom/domains.png',
    imageAlt: 'Different domains',
    reverse: true,
  },
  {
    title: 'Seamless integration with deep learning frameworks',
    description: 'Albumentations can work with various deep learning frameworks such as PyTorch and Keras. The library is a part of the PyTorch ecosystem. MMDetection and YOLOv5 use Albumentations.',
    image: '/assets/custom/deep_learning_frameworks.png',
    imageAlt: 'Deep learning frameworks',
    reverse: false,
  },
]

function FeatureBlock({ title, description, image, imageAlt, reverse }: Feature) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${reverse ? 'md:flex-row-reverse' : ''}`}>
      <div className={reverse ? 'md:pl-8' : 'md:pr-8'}>
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <p className="text-gray-600 text-lg">{description}</p>
      </div>
      <div>
        <Image
          src={image}
          alt={imageAlt}
          width={500}
          height={300}
          className="w-full h-auto"
        />
      </div>
    </div>
  )
}

export default function Features() {
  return (
    <div className="features">
      {features.map((feature, index) => (
        <Section
          key={feature.title}
          title={feature.title}
          background={index % 2 === 0 ? 'light' : 'white'}
        >
          <FeatureBlock {...feature} />
        </Section>
      ))}
    </div>
  )
}
