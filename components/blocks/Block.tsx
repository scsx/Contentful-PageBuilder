import type { TBlockWrapper, THero, TFaqs } from '@/types/contentful-models'
import { Hero } from './Hero'
import { Faqs } from './Faqs'

interface BlockProps {
  readonly block: TBlockWrapper
}

export function Block({ block }: BlockProps) {
  const content = block.fields.content as unknown as THero | TFaqs

  // Determina o tipo de conteúdo e renderiza o componente certo
  if (!content) {
    return null
  }

  // Verifica qual é o tipo de conteúdo
  const isFaqs =
    content &&
    'fields' in content &&
    content.fields &&
    'items' in (content.fields as Record<string, unknown>)
  const isHero =
    content &&
    'fields' in content &&
    content.fields &&
    'title' in (content.fields as Record<string, unknown>)

  return (
    <div className='w-full'>
      {isHero && <Hero data={content as THero} />}
      {isFaqs && <Faqs data={content as TFaqs} />}
    </div>
  )
}
