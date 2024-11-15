'use client'

import { createPortal } from 'react-dom'
import Link from 'next/link'
import { Button } from '@/app/components/Button'
import { useEffect, useState } from 'react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  links: Array<{
    href: string
    label: string
    external?: boolean
  }>
}

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  const [mounted, setMounted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
    } else {
      const timer = setTimeout(() => {
        setIsAnimating(false)
      }, 300) // Match transition duration
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!mounted) return null

  const menuContent = (
    <>
      {(isOpen || isAnimating) && (
        <>
          <div
            className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
              isOpen ? 'bg-opacity-50 opacity-100' : 'bg-opacity-0 opacity-0'
            }`}
            onClick={onClose}
          />
          <div
            className={`fixed right-0 top-0 h-full w-64 bg-white z-50 shadow-xl transition-transform duration-300 ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="p-4">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                aria-label="Close menu"
              >
                <i className="fas fa-times text-xl" />
              </button>
              <nav className="mt-8 flex flex-col gap-4">
                {links.map(({ href, label, external }) => (
                  external ? (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 py-2"
                      onClick={onClose}
                    >
                      {label}
                    </a>
                  ) : (
                    <Link
                      key={href}
                      href={href}
                      className="text-gray-600 hover:text-gray-900 py-2"
                      onClick={onClose}
                    >
                      {label}
                    </Link>
                  )
                ))}
                <div className="pt-4 space-y-4">
                  <Button
                    href="https://github.com/sponsors/albumentations-team"
                    variant="outline-success"
                    fullWidth
                    external
                    icon="fa fa-heart"
                  >
                    Sponsor
                  </Button>
                  <Button
                    href="https://github.com/albumentations-team/albumentations"
                    variant="outline-primary"
                    fullWidth
                    external
                    icon="fab fa-github"
                  >
                    GitHub
                  </Button>
                </div>
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  )

  return mounted ? createPortal(menuContent, document.body) : null
}
