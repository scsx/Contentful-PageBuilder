'use client'

import type { TCtaGroup, TCta } from '@/types/contentful-models'
import { CTA } from '@/components/Button'

type CtaGroupProps = {
  data: TCtaGroup
}

export function CtaGroup({ data }: CtaGroupProps) {
  const fields = data.fields as Record<string, unknown>
  const items = (fields?.items as TCta[]) ?? []
  const direction = (fields?.direction as boolean) ?? false 
  const alignment = (fields?.alignment as string) ?? 'center'
  const titleAndSubtitle = fields?.titleAndSubtitle as Record<string, unknown> | undefined

  // Extract title and subtitle from titleAndSubtitle entry
  const titleSubtitleFields = titleAndSubtitle?.fields as Record<string, unknown> | undefined
  const title = String(titleSubtitleFields?.title || '')
  const subtitle = String(titleSubtitleFields?.text || '')

  // Define alinhamento e layout
  const isVertical = !direction
  const isFull = alignment === 'full'

  // Classes de alinhamento baseadas na direção
  let positionClass = ''
  if (isVertical) {
    // Vertical: usar items-* para alinhar no eixo horizontal
    positionClass = !isFull
      ? {
          left: 'items-start',
          center: 'items-center',
          right: 'items-end'
        }[alignment] || 'items-center'
      : ''
  } else {
    // Horizontal: usar justify-* para alinhar no eixo horizontal
    positionClass = !isFull
      ? {
          left: 'justify-start',
          center: 'justify-center',
          right: 'justify-end'
        }[alignment] || 'justify-center'
      : ''
  }

  const flexDirection = isVertical ? 'flex-col' : 'flex-row'
  const itemWidth = isFull ? 'w-full' : 'w-auto'

  return (
    <div className='w-full flex flex-col'>
      {/* Header */}
      {(title || subtitle) && (
        <div className='text-center mb-8'>
          {title && <h2 className='text-2xl font-bold mb-2'>{title}</h2>}
          {subtitle && <p className='text-gray-600 dark:text-gray-400'>{subtitle}</p>}
        </div>
      )}

      {/* HORIZONTAL LAYOUT */}
      {!isVertical && (
        <div className={`flex flex-row gap-4 ${positionClass}`}>
          {items.map((cta) => (
            <CTA cta={cta} key={cta.sys.id} className={itemWidth} />
          ))}
        </div>
      )}

      {/* VERTICAL LAYOUT */}
      {isVertical && (
        <div className={`flex flex-col gap-3 ${positionClass} w-full`}>
          {items.map((cta) => (
            <CTA cta={cta} key={cta.sys.id} className='w-full' />
          ))}
        </div>
      )}
    </div>
  )
}
