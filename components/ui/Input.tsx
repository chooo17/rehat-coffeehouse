import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') : undefined)
    return (
      <div className="flex flex-col gap-1">
        {label && <label htmlFor={inputId} className="text-[10px] font-bold tracking-[4px] uppercase text-brand-black/60">{label}</label>}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            'w-full border-b-2 border-brand-black/20 bg-transparent py-2 text-brand-black placeholder:text-brand-black/30 focus:outline-none focus:border-brand-orange transition-colors',
            error && 'border-red-500',
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    )
  }
)
Input.displayName = 'Input'
