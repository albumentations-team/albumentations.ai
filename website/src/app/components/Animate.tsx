'use client'

import { motion, type Variant } from 'framer-motion'
import { type ReactNode } from 'react'

interface AnimateProps {
  children: ReactNode
  className?: string
  animation?: 'fadeIn' | 'slideUp' | 'slideIn'
  delay?: number
}

const animations: Record<string, { initial: Variant; animate: Variant }> = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
  slideIn: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
  },
}

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
