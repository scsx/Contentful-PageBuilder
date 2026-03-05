import type {
  TBlockWrapper,
  THero,
  TFaqs,
  TGenericContentColumns,
  TLargeHero,
  TTimeline
} from '@/types/contentful-models'
import { Hero } from './Hero'
import { Faqs } from './Faqs'
import { GenericColumns } from './GenericColumns'
import { LargeHero } from './LargeHero'
import { Timeline } from './Timeline'

interface BlockProps {
  readonly block: TBlockWrapper
}

export function Block({ block }: BlockProps) {
  const content = block.fields.content as unknown as
    | THero
    | TFaqs
    | TGenericContentColumns
    | TLargeHero
    | TTimeline
  const centerVertically = (block.fields as Record<string, unknown>).centerVertically as
    | boolean
    | undefined

  // Determina o tipo de conteúdo e renderiza o componente certo
  if (!content) {
    return null
  }

  // Verifica qual é o tipo de conteúdo usando o content type ID
  const sys = (content as { sys?: { contentType?: { sys?: { id?: string } } } }).sys
  const contentTypeId = sys?.contentType?.sys?.id || ''

  const isHero = contentTypeId === 'hero'
  const isFaqs = contentTypeId === 'faqs'
  const isGenericColumns = contentTypeId === 'genericContentColumns'
  const isLargeHero = contentTypeId === 'largeHero'
  const isTimeline = contentTypeId === 'timeline'

  let blockType = 'Unknown'
  let badgeColor = 'bg-gray-500'

  if (isHero) {
    blockType = 'Hero'
    badgeColor = 'bg-blue-500'
  } else if (isFaqs) {
    blockType = 'FAQs'
    badgeColor = 'bg-purple-500'
  } else if (isGenericColumns) {
    blockType = 'Columns'
    badgeColor = 'bg-amber-500'
  } else if (isLargeHero) {
    blockType = 'Large Hero'
    badgeColor = 'bg-indigo-500'
  } else if (isTimeline) {
    blockType = 'Timeline'
    badgeColor = 'bg-cyan-500'
  }

  const centerClasses = centerVertically ? 'flex items-center justify-center' : ''

  return (
    <div className={`w-full h-full relative ${centerClasses}`}>
      <div
        className={`absolute top-2 right-2 z-10 ${badgeColor} text-white text-xs font-semibold px-2 py-1 rounded`}>
        {blockType}
      </div>
      {isHero && <Hero data={content as THero} />}
      {isFaqs && <Faqs data={content as TFaqs} />}
      {isGenericColumns && <GenericColumns data={content as TGenericContentColumns} />}
      {isLargeHero && <LargeHero data={content as TLargeHero} />}
      {isTimeline && <Timeline data={content as TTimeline} />}
    </div>
  )
}
