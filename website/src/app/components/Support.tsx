import { Section } from '@/app/components/Section'
import SponsorButton from '@/app/components/SponsorButton'

export default function Support() {
  return (
    <Section
      title="Support Open Source Development"
      background="light"
      className="max-w-5xl mx-auto"
    >
      <div className="space-y-8">
        {/* Value Proposition */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xl text-gray-700 mb-4">
            Albumentations is a free, open-source project maintained by a dedicated team of developers
          </p>
          <p className="text-gray-600">
            Your sponsorship helps us maintain high-quality code, provide timely updates, and develop new features
          </p>
        </div>

        {/* Sponsorship Options */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Individual Sponsors */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
              <i className="fas fa-heart text-pink-500" />
              Individual Sponsors
            </h3>
            <p className="text-gray-600 mb-4">
              Support open source with a monthly contribution of any size. Every dollar helps maintain and improve Albumentations.
            </p>
            <SponsorButton />
          </div>

          {/* Company Sponsors */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
              <i className="fas fa-building text-blue-500" />
              Company Sponsorship
            </h3>
            <p className="text-gray-600 mb-4">
              Companies using Albumentations can become official sponsors, getting their logo featured on our website and documentation.
            </p>
            <a
              href="https://github.com/sponsors/albumentations-team"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors"
            >
              <i className="fab fa-github" />
              View Sponsorship Tiers
            </a>
          </div>
        </div>

        {/* Impact Statement */}
        <div className="text-center text-sm text-gray-500">
          100% of sponsorships go directly to supporting development and maintenance.
        </div>
      </div>
    </Section>
  )
}
