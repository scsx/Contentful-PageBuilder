'use client'

import type { TFaqs } from '@/types/contentful-models'
import { Accordion, Text } from '@contentful/f36-components'

interface FaqItem {
  sys: {
    id: string
  }
  fields?: {
    title?: string
    text?: string
    [key: string]: unknown
  }
  [key: string]: unknown
}

interface FaqsProps {
  readonly data: TFaqs
}

export function Faqs({ data }: FaqsProps) {
  const { items } = data.fields as Record<string, unknown>
  const itemsArray = Array.isArray(items) ? items : []

  console.log('FAQ items:', itemsArray)

  return (
    <Accordion>
      {itemsArray && itemsArray.length > 0 ? (
        itemsArray.map((item: FaqItem, index) => {
          const itemFields = item.fields as Record<string, unknown> | undefined
          const title = String(itemFields?.title || `FAQ ${index + 1}`)
          const text = String(itemFields?.text || 'Sem descrição')

          return (
            <Accordion.Item key={`${item.sys.id}-${index}`} title={title}>
              <Text>{text}</Text>
            </Accordion.Item>
          )
        })
      ) : (
        <p>Sem items</p>
      )}
    </Accordion>
  )
}
