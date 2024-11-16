'use client'

import Image from 'next/image'
import { sponsors } from '../data/sponsors'

export default function Sponsors() {
  const silverSponsors = sponsors.filter(s => s.tier === 'silver')
  const bronzeSponsors = sponsors.filter(s => s.tier === 'bronze')

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-medium mb-3">
            Community-Driven Project, Supported By
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Albumentations thrives on developer contributions. We appreciate our sponsors who help sustain the project&apos;s infrastructure.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Gold Tier - Empty */}
          <div className="bg-gradient-to-b from-amber-50 to-white p-6 rounded-xl border border-amber-100">
            <div className="text-center mb-4">
              <span className="text-base font-semibold text-amber-600 bg-amber-50 px-4 py-1.5 rounded-full">
                Gold Sponsors
              </span>
            </div>
            <div className="h-32 flex items-center justify-center text-gray-400 text-lg">
              Your company could be here
            </div>
          </div>

          {/* Silver Tier */}
          <div className="bg-gradient-to-b from-gray-50 to-white p-6 rounded-xl border border-gray-100">
            <div className="text-center mb-4">
              <span className="text-base font-semibold text-gray-600 bg-gray-50 px-4 py-1.5 rounded-full">
                Silver Sponsors
              </span>
            </div>
            <div className="flex flex-col gap-6 items-center">
              {silverSponsors.map((sponsor) => (
                <a
                  key={sponsor.name}
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="p-4 rounded-lg hover:bg-white hover:shadow-md transition-all">
                    <Image
                      src={`/assets/sponsors/${sponsor.imgFilename}`}
                      alt={sponsor.name}
                      width={180}
                      height={60}
                      className="object-contain"
                    />
                    <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-gray-900 text-white text-sm rounded whitespace-nowrap">
                      {sponsor.description}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Bronze Tier */}
          <div className="bg-gradient-to-b from-orange-50 to-white p-6 rounded-xl border border-orange-100">
            <div className="text-center mb-4">
              <span className="text-base font-semibold text-amber-700 bg-amber-50 px-4 py-1.5 rounded-full">
                Bronze Sponsors
              </span>
            </div>
            <div className="flex flex-col gap-4 items-center">
              {bronzeSponsors.map((sponsor) => (
                <a
                  key={sponsor.name}
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="p-3 rounded-lg hover:bg-white hover:shadow-md transition-all">
                    <Image
                      src={`/assets/sponsors/${sponsor.imgFilename}`}
                      alt={sponsor.name}
                      width={160}
                      height={50}
                      className="object-contain"
                    />
                    <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-gray-900 text-white text-sm rounded whitespace-nowrap">
                      {sponsor.description}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-8 space-y-4">
          {/* Primary CTA Button */}
          <a
            href="https://github.com/sponsors/albumentations-team"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-white border-2 border-pink-100 hover:border-pink-200 rounded-full shadow-sm hover:shadow-md transition-all group"
          >
            <span className="text-lg font-medium text-gray-700">
              Become a Sponsor
            </span>
            <i className="fas fa-heart text-pink-500 group-hover:scale-110 transition-transform" />
          </a>

          {/* Explanatory text */}
          <div className="text-gray-500">
            View sponsorship tiers and benefits on GitHub Sponsors
            <i className="fas fa-external-link-alt ml-2 text-sm" />
          </div>
        </div>
      </div>
    </div>
  )
}
