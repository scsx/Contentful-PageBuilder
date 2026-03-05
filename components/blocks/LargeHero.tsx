'use client'

import type { TLargeHero } from '@/types/contentful-models'
import { Heading } from '@contentful/f36-typography'

interface LargeHeroProps {
  readonly data: TLargeHero
}

export function LargeHero({ data }: LargeHeroProps) {
  const fields = data.fields as Record<string, unknown>
  const content = fields.content as { fields?: Record<string, unknown> } | undefined

  // Extrai title e text do content.fields
  const title = (content?.fields?.title as string) ?? ''
  const text = (content?.fields?.text as string) ?? ''

  return (
    <div className='w-full py-8'>
      <div className='space-y-4'>
        <h1 className='giant-h1'>{title}</h1>
        <Heading
          as='h2'
          fontSize='fontSizeXl'
          fontWeight='fontWeightDemiBold'
          fontColor='colorWhite'>
          {text}
        </Heading>
      </div>
    </div>
  )
}
