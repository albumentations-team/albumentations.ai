import Link from 'next/link'
import { Button } from '@/app/components/Button'

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/docs', label: 'Documentation' },
  { href: '/whos_using', label: "Who's using" },
  { href: 'https://explore.albumentations.ai', label: 'Explore', external: true },
  { href: '/people', label: 'People' },
  {
    href: 'https://github.com/albumentations-team/albumentations',
    label: 'GitHub',
    external: true
  },
]

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map(({ href, label, external }) => (
              external ? (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {label}
                </a>
              ) : (
                <Link
                  key={href}
                  href={href}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {label}
                </Link>
              )
            ))}
          </nav>
          <Button
            href="https://github.com/sponsors/albumentations-team"
            variant="outline-success"
            external
          >
            Sponsor
          </Button>
        </div>
      </div>
    </footer>
  )
}
