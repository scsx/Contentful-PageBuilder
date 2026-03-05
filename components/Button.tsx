'use client'

import type { TCta } from '@/types/contentful-models'

type CTAProps = {
  readonly cta: TCta
  readonly className?: string
}

const colorMap: Record<string, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  alternative: 'btn-alternative',
  neutral: 'btn-neutral',
  white: 'btn-white'
}

export function CTA({ cta, className = '' }: CTAProps) {
  const fields = cta.fields as Record<string, unknown>
  const ctaText = String(fields.ctaText || '')
  const ctaUrl = String(fields.ctaUrl || '')
  const bgColor = (fields.ctaBgColour as string) || 'white'

  const backgroundClass = colorMap[bgColor] || 'bg-white text-black'
  const baseClasses = `${backgroundClass} px-8 py-3 rounded-lg font-semibold`
  const finalClassName = `${baseClasses} ${className}`.trim()

  return (
    <a href={ctaUrl} target='_blank' rel='noopener noreferrer' className={finalClassName}>
      {ctaText}
    </a>
  )
}
