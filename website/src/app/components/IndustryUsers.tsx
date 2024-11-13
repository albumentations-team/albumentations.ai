'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import { Section } from '@/app/components/Section'
import 'swiper/css'
import 'swiper/css/navigation'

import { industryUsers } from '@/app/data/industry_users'

export default function IndustryUsers() {
  return (
    <Section title="Industry users of Albumentations">
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={10}
        slidesPerView={5}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation
        loop
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10  },
          640: { slidesPerView: 2, spaceBetween: 15 },
          768: { slidesPerView: 3, spaceBetween: 15 },
          1024: { slidesPerView: 5, spaceBetween: 20 },
        }}
        className="industry-carousel px-2"
      >
        {industryUsers.map((company) => (
          <SwiperSlide key={company.name}>
            {/* Increased height and added better flex alignment */}
            <div className="h-[160px] flex items-center justify-center">
              <a
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-4 transition-transform hover:scale-105"
              >
                <Image
                  src={`/assets/industry/${company.img_filename}`}
                  alt={company.name}
                  width={100}
                  height={100}
                  className="w-auto h-auto max-h-[100px] mx-auto object-contain"
                />
              </a>
            </div>
            {/* Enhanced company name styling */}
            <div className="text-center mt-6 hidden md:block">
              <a
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors"
              >
                {company.name}
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  )
}
