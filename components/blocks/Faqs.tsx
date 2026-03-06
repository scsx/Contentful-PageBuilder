'use client'

import { useState } from 'react'
import type { TFaqs } from '@/types/contentful-models'

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

type FaqsProps = {
  data: TFaqs
}

export function Faqs({ data }: FaqsProps) {
  const { items, title } = data.fields as Record<string, unknown>
  const itemsArray = Array.isArray(items) ? items : []
  const blockTitle = title ? String(title) : null
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div>
      {blockTitle && <h2 className='text-2xl font-bold mb-6 text-gray-900'>{blockTitle}</h2>}
      <div className='space-y-2'>
        {itemsArray && itemsArray.length > 0 ? (
          itemsArray.map((item: FaqItem) => {
            const itemFields = item.fields as Record<string, unknown> | undefined
            const itemTitle = String(itemFields?.title || 'FAQ')
            const text = String(itemFields?.text || 'Sem descrição')
            const isOpen = openId === item.sys.id

            return (
              <div key={item.sys.id} className='border border-gray-200 rounded-lg'>
                <button
                  onClick={() => setOpenId(isOpen ? null : item.sys.id)}
                  className='w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 transition-colors'>
                  <h3 className='font-semibold text-gray-900'>{itemTitle}</h3>
                  <svg
                    className={`w-5 h-5 text-gray-600 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 14l-7 7m0 0l-7-7m7 7V3'
                    />
                  </svg>
                </button>
                {isOpen && (
                  <div className='px-4 py-3 bg-gray-50 border-t border-gray-200'>
                    <p className='text-gray-700'>{text}</p>
                  </div>
                )}
              </div>
            )
          })
        ) : (
          <p className='text-gray-500'>Sem items</p>
        )}
      </div>
    </div>
  )
}
