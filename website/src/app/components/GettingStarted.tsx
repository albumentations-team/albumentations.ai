import { Section } from '@/app/components/Section'
import { Button } from '@/app/components/Button'

export default function GettingStarted() {
  return (
    <Section title="Getting started">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-lg mb-4">
          Albumentations requires Python 3.6 or higher. To install the library from PyPI run
        </p>
        <div className="bg-white border border-gray-400 rounded-lg p-4 mb-6 font-mono text-xl">
          pip install -U albumentations
        </div>
        <Button
          href="/docs"
          variant="primary"
          size="lg"
          icon="fas fa-angle-right"
        >
          Open documentation
        </Button>
      </div>
    </Section>
  )
}
