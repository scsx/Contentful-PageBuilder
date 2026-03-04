import type { THero } from '@/types/contentful-models'

interface HeroProps {
  readonly data: THero
}

export function Hero({ data }: HeroProps) {
  const { title, text, backgroundImage, cta } = data.fields

  return (
    <div
      className='relative w-full min-h-96 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800 flex items-center justify-center'
      style={{
        backgroundImage: backgroundImage?.fields?.file?.url
          ? `url(${backgroundImage.fields.file.url})`
          : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
      <div className='absolute inset-0 bg-black/40' />
      <div className='relative z-10 text-center text-white px-6'>
        <h2 className='text-4xl font-bold mb-4'>{title}</h2>
        {text && <p className='text-lg mb-6'>Rich text content here</p>}
        {cta && (
          <button className='bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200'>
            CTA Button
          </button>
        )}
      </div>
    </div>
  )
}
