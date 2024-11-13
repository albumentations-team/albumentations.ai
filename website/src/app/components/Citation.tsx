import { Section } from '@/app/components/Section'

const CITATION = `@Article{info11020125,
    AUTHOR = {Buslaev, Alexander and Iglovikov, Vladimir I. and Khvedchenya, Eugene and Parinov, Alex and Druzhinin, Mikhail and Kalinin, Alexandr A.},
    TITLE = {Albumentations: Fast and Flexible Image Augmentations},
    JOURNAL = {Information},
    VOLUME = {11},
    YEAR = {2020},
    NUMBER = {2},
    ARTICLE-NUMBER = {125},
    URL = {https://www.mdpi.com/2078-2489/11/2/125},
    ISSN = {2078-2489},
    DOI = {10.3390/info11020125}
}`

export default function Citation() {
  return (
    <Section title="Citing">
      <div className="max-w-4xl mx-auto">
        <p className="text-lg mb-4">
          If you find this library useful for your research, please consider citing{' '}
          <a
            href="https://www.mdpi.com/2078-2489/11/2/125"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Albumentations: Fast and Flexible Image Augmentations
          </a>:
        </p>
        <pre className="bg-gray-50 border border-gray-300 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
          <code>{CITATION}</code>
        </pre>
      </div>
    </Section>
  )
}
