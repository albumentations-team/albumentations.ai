'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './Button'
import { MobileMenu } from './MobileMenu'
import SponsorButton from './SponsorButton'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/docs', label: 'Documentation' },
  { href: '/whos_using', label: "Who's using" },
  { href: 'https://explore.albumentations.ai', label: 'Explore', external: true },
  { href: '/people', label: 'People' },
]

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/albumentations_logo.png"
              alt="Albumentations"
              width={32}
              height={32}
              className="mr-2"
            />
            <span className="font-medium text-lg">Albumentations</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ href, label, external }) => (
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

            <SponsorButton />

            <Button
              href="https://github.com/albumentations-team/albumentations"
              variant="outline-primary"
              size="sm"
              icon="fab fa-github"
              external
            >
              GitHub
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <i className="fas fa-bars text-xl" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={navLinks}
      />
    </nav>
  )
}
