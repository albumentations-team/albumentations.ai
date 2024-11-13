'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import { Section } from '@/app/components/Section'
import 'swiper/css'
import 'swiper/css/navigation'

interface Company {
  name: string
  url: string
  imgFilename: string
}

const companies: Company[] = [
  // Add your company data here
]

export default function IndustryUsers() {
  return (
    <Section title="Industry users of Albumentations">
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={30}
        slidesPerView={5}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation
        loop
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
        className="industry-carousel"
      >
        {companies.map((company) => (
          <SwiperSlide key={company.name}>
            <div className="h-[200px] flex items-center justify-center px-4">
              <a
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <Image
                  src={`/assets/img/industry/${company.imgFilename}`}
                  alt={company.name}
                  width={200}
                  height={100}
                  className="w-full h-auto object-contain"
                />
              </a>
            </div>
            <div className="text-center mt-4 hidden md:block">
              <a
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
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
