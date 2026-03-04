'use client'

import { useEffect, useState } from 'react'
import type { TFaqs } from '@/types/contentful-models'
import { Accordion, Text, Heading } from '@contentful/f36-components'

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
  const { items, title } = data.fields as Record<string, unknown>
  const itemsArray = Array.isArray(items) ? items : []
  const blockTitle = title ? String(title) : null
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div>{blockTitle && <Heading>{blockTitle}</Heading>}</div>
  }

  return (
    <div>
      {blockTitle && <Heading>{blockTitle}</Heading>}
      <Accordion>
        {itemsArray && itemsArray.length > 0 ? (
          itemsArray.map((item: FaqItem, index) => {
            const itemFields = item.fields as Record<string, unknown> | undefined
            const itemTitle = String(itemFields?.title || `FAQ ${index + 1}`)
            const text = String(itemFields?.text || 'Sem descrição')

            return (
              <Accordion.Item key={`${item.sys.id}-${index}`} title={itemTitle}>
                <Text>{text}</Text>
              </Accordion.Item>
            )
          })
        ) : (
          <p>Sem items</p>
        )}
      </Accordion>
    </div>
  )
}
