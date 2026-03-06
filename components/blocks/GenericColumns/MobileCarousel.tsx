'use client'

import { useState } from 'react'
import type React from 'react'

type ColumnItem = {
  sys: { id: string }
  fields?: Record<string, unknown>
}

interface MobileCarouselProps {
  items: ColumnItem[]
  renderItem: (item: ColumnItem, index: number) => React.ReactNode
}

export function MobileCarousel({ items, renderItem }: MobileCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!items || items.length === 0) return null

  return (
    <div className='flex-1 flex flex-col'>
      <div className='flex-1 overflow-x-auto scrollbar-hide'>
        <div className='flex gap-4 flex-nowrap p-4'>
          {items.map((item, index) => (
            <div key={item.sys.id} className='min-w-full'>
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Dots */}
      <div className='flex justify-center gap-2 pb-4'>
        {items.map((item, index) => (
          <button
            key={item.sys.id}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition ${
              index === currentIndex ? 'bg-primary' : 'bg-gray-300'
            }`}
            aria-label={`Go to item ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
