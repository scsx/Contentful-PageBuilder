import type { THero } from '@/types/contentful-models'
import type { Document } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { CTAButton } from '@/components/Button'

interface AssetFile {
  url: string
  [key: string]: unknown
}

interface AssetFields {
  file?: AssetFile
  [key: string]: unknown
}

interface Asset {
  sys: {
    id: string
  }
  fields?: AssetFields
  [key: string]: unknown
}

interface HeroProps {
  readonly data: THero
}

export function Hero({ data }: HeroProps) {
  const fields = data.fields as Record<string, unknown>
  const { title, text, backgroundImage, cta } = fields

  return (
    <div
      className='relative w-full min-h-96 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800 flex items-center justify-center'
      style={{
        backgroundImage:
          backgroundImage && typeof backgroundImage === 'object' && 'fields' in backgroundImage
            ? `url(${(backgroundImage as Asset).fields?.file?.url})`
            : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
      <div className='absolute inset-0 bg-black/40' />
      <div className='relative z-10 text-center text-white px-6'>
        <h2 className='text-4xl font-bold mb-4'>{String(title)}</h2>
        {text !== undefined && text !== null && (
          <div className='text-lg mb-6'>{documentToReactComponents(text as Document)}</div>
        )}
        {cta !== undefined &&
          cta !== null &&
          (() => {
            const ctaFields = (cta as Record<string, unknown>)?.fields as Record<string, unknown>
            const ctaText = String(ctaFields?.ctaText || 'CTA Button')
            const ctaUrl = String(ctaFields?.ctaUrl || '')
            return <CTAButton text={ctaText} href={ctaUrl || undefined} />
          })()}
      </div>
    </div>
  )
}
