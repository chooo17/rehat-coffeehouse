import { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
}

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center px-6 py-3 text-sm font-semibold tracking-widest uppercase transition-all duration-200 disabled:opacity-50'
  const variants = {
    primary: 'bg-brand-accent text-brand-dark hover:bg-brand-mid hover:text-brand-light',
    outline: 'border border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-brand-light',
    ghost:   'text-brand-accent hover:text-brand-mid underline-offset-4 hover:underline',
  }
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  )
}
