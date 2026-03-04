import type { TBlockWrapper, THero, TFaqs, TGenericContentColumns } from '@/types/contentful-models'
import { colorClassMap, paddingTopMap, paddingBottomMap } from '@/lib/blockStyleMaps'
import { Hero } from './Hero'
import { Faqs } from './Faqs'
import { GenericColumns } from './GenericColumns'

interface BlockProps {
  readonly block: TBlockWrapper
}

export function Block({ block }: BlockProps) {
  const content = block.fields.content as unknown as THero | TFaqs | TGenericContentColumns
  const backgroundColour = block.fields.backgroundColour as string | undefined
  const paddingTop = block.fields.paddingTop as string | undefined
  const paddingBottom = block.fields.paddingBottom as string | undefined

  // Determina o tipo de conteúdo e renderiza o componente certo
  if (!content) {
    return null
  }

  const bgClass = colorClassMap[backgroundColour || 'white'] || 'bg-white'
  const ptClass = paddingTopMap[paddingTop || 'm'] || 'pt-12'
  const pbClass = paddingBottomMap[paddingBottom || 'm'] || 'pb-12'

  // Verifica qual é o tipo de conteúdo
  const isFaqs =
    content &&
    'fields' in content &&
    content.fields &&
    'items' in (content.fields as Record<string, unknown>) &&
    !('subtitle' in (content.fields as Record<string, unknown>))

  const isHero =
    content &&
    'fields' in content &&
    content.fields &&
    'title' in (content.fields as Record<string, unknown>) &&
    'backgroundImage' in (content.fields as Record<string, unknown>)

  const isGenericColumns =
    content &&
    'fields' in content &&
    content.fields &&
    'items' in (content.fields as Record<string, unknown>) &&
    'subtitle' in (content.fields as Record<string, unknown>)

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
  }

  return (
    <div className={`w-full h-full ${bgClass}`}>
      <div className={`container relative ${ptClass} ${pbClass}`}>
        <div
          className={`absolute top-2 right-2 z-10 ${badgeColor} text-white text-xs font-semibold px-2 py-1 rounded`}>
          {blockType}
        </div>
        {isHero && <Hero data={content as THero} />}
        {isFaqs && <Faqs data={content as TFaqs} />}
        {isGenericColumns && <GenericColumns data={content as TGenericContentColumns} />}
      </div>
    </div>
  )
}
