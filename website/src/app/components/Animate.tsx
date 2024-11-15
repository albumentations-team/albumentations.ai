'use client'

import { type ReactNode, useEffect, useState } from 'react'

interface AnimateProps {
  children: ReactNode
  className?: string
  animation?: 'fadeIn' | 'slideUp' | 'slideIn'
  delay?: number
}

const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: 'opacity 0.5s ease',
  },
  slideUp: {
    initial: { opacity: 0, transform: 'translateY(20px)' },
    animate: { opacity: 1, transform: 'translateY(0)' },
    transition: 'opacity 0.5s ease, transform 0.5s ease',
  },
  slideIn: {
    initial: { opacity: 0, transform: 'translateX(-20px)' },
    animate: { opacity: 1, transform: 'translateX(0)' },
    transition: 'opacity 0.5s ease, transform 0.5s ease',
  },
} as const

export function Animate({
  children,
  className = '',
  animation = 'fadeIn',
  delay = 0,
}: AnimateProps) {
  const [isVisible, setIsVisible] = useState(false)
  const { initial, animate, transition } = animations[animation]

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [delay])

  const style = {
    ...initial,
    ...(isVisible ? animate : {}),
    transition,
  }

  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}
