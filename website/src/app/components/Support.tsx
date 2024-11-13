import { Section } from '@/app/components/Section'
import { Button } from '@/app/components/Button'

export default function Support() {
  return (
    <Section
      title="Support the project"
      background="light"
      className="max-w-4xl mx-auto"
    >
      <div className="flex flex-col md:flex-row items-center gap-6">
        <Button
          href="https://github.com/sponsors/albumentations-team"
          variant="outline-success"
          icon="fa fa-heart"
          external
        >
          Sponsor
        </Button>
        <p className="text-lg text-gray-700">
          You can support the project by sponsoring it through{' '}
          <a
            href="https://github.com/sponsors/albumentations-team"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            GitHub Sponsors
          </a>.
        </p>
      </div>
    </Section>
  )
}
