'use client'

import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
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

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const menuContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-64 bg-white z-50 shadow-xl"
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )

  return mounted ? createPortal(menuContent, document.body) : null
}
