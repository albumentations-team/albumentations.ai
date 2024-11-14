'use client'

import { motion} from 'framer-motion'
import { type ReactNode } from 'react'

interface AnimateProps {
  children: ReactNode
  className?: string
  animation?: 'fadeIn' | 'slideUp' | 'slideIn'
  delay?: number
}

const animations = {
  fadeIn: {
    initial: { opacity: 0 } as const,
    animate: { opacity: 1 } as const,
  },
  slideUp: {
    initial: { opacity: 0, y: 20 } as const,
    animate: { opacity: 1, y: 0 } as const,
  },
  slideIn: {
    initial: { opacity: 0, x: -20 } as const,
    animate: { opacity: 1, x: 0 } as const,
  },
} as const

export function Animate({
  children,
  className = '',
  animation = 'fadeIn',
  delay = 0,
}: AnimateProps) {
  const { initial, animate } = animations[animation]

  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
