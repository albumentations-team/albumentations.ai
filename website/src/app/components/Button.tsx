import { type ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'outline-primary' | 'outline-success' | 'light' | 'stats'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  href?: string
  external?: boolean
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: ReactNode
  icon?: string
  onClick?: () => void
  fullWidth?: boolean
}

export function Button({
  href,
  external,
  variant = 'primary',
  size = 'md',
  className,
  children,
  icon,
  onClick,
  fullWidth,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors rounded-md'

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    'outline-primary': 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
    'outline-success': 'border-2 border-green-600 text-green-600 hover:bg-green-50',
    light: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    stats: 'bg-white border text-gray-700 hover:bg-gray-50 w-full md:w-auto',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  }

  const classes = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    className
  )

  const content = (
    <>
      {icon && <i className={`${icon} ${children ? 'mr-2' : ''}`} />}
      {children}
    </>
  )

  if (href) {
    const linkProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
    return href.startsWith('http') ? (
      <a href={href} className={classes} {...linkProps}>
        {content}
      </a>
    ) : (
      <Link href={href} className={classes}>
        {content}
      </Link>
    )
  }

  return (
    <button className={classes} onClick={onClick}>
      {content}
    </button>
  )
}
