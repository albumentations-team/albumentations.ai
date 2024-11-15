import React from 'react'

interface SectionProps {
  title: string
  children: React.ReactNode
  className?: string
  background?: 'light' | 'white'
}

export function Section({ title, children, className = '', background = 'white' }: SectionProps) {
  return (
    <div className={`${background === 'light' ? 'bg-gray-50' : 'bg-white'} py-12 md:py-16`}>
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-2xl md:text-3xl font-medium text-center mb-8">
            {title}
          </h2>
        )}
        <div className={className}>{children}</div>
      </div>
    </div>
  )
}
