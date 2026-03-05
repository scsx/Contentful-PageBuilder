'use client'

import { useState } from 'react'
import type { TGenericContentColumns } from '@/types/contentful-models'
import type { Document } from '@contentful/rich-text-types'
import { Heading, Paragraph, Box } from '@contentful/f36-components'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

interface AssetFile {
  url: string
  [key: string]: unknown
}

interface AssetFields {
  file?: AssetFile
  title?: string
  [key: string]: unknown
}

interface Asset {
  sys: {
    id: string
  }
  fields?: AssetFields
  [key: string]: unknown
}

interface ColumnItem {
  sys: {
    id: string
  }
  fields?: {
    title?: string
    text?: Document | string
    image?: Asset
    [key: string]: unknown
  }
  [key: string]: unknown
}

type GenericColumnsProps = {
  data: TGenericContentColumns
}

function getGridColsClass(itemCount: number): string {
  const gridMap: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6'
  }
  return gridMap[itemCount] || 'grid-cols-6'
}

export function GenericColumns({ data }: GenericColumnsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const fields = data.fields as Record<string, unknown>
  const title = String(fields?.title || '')
  const subtitle = String(fields?.subtitle || '')
  const isCarousel = (fields?.isCarousel as boolean) ?? false
  const isNumbered = (fields?.isNumbered as boolean) ?? false
  const items = Array.isArray(fields?.items) ? (fields.items as ColumnItem[]) : []

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1))
  }

  const renderItem = (item: ColumnItem, index: number) => {
    const itemFields = item.fields as Record<string, unknown> | undefined
    const itemTitle = String(itemFields?.title || `Item ${index + 1}`)
    const itemText = itemFields?.text
    const itemImage = itemFields?.image as Asset | undefined

    const isDocument =
      itemText !== undefined &&
      itemText !== null &&
      typeof itemText === 'object' &&
      'nodeType' in itemText
    const imageUrl =
      itemImage && 'fields' in itemImage ? (itemImage as Asset).fields?.file?.url : undefined

    const itemNumber = String(index + 1).padStart(2, '0')

    return (
      <Box
        key={`${item.sys.id}-${index}`}
        className='relative overflow-hidden bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm w-full'>
        {isNumbered && <div className='text-4xl mt-4 ml-5 -mb-4 text-blue-500'>{itemNumber}</div>}
        {imageUrl && (
          <div className='h-48 overflow-hidden bg-gray-200 dark:bg-gray-700'>
            <img src={imageUrl} alt={itemTitle} className='w-full h-full object-cover' />
          </div>
        )}
        <div className='p-6'>
          <Heading as='h3' className='mb-3'>
            {itemTitle}
          </Heading>
          {itemText !== undefined && itemText !== null && (
            <div className='text-gray-700 dark:text-gray-300'>
              {isDocument ? (
                documentToReactComponents(itemText as Document)
              ) : (
                <Paragraph>{String(itemText)}</Paragraph>
              )}
            </div>
          )}
        </div>
      </Box>
    )
  }

  if (!items || items.length === 0) {
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <p className='text-gray-500 dark:text-gray-400'>Sem items</p>
      </div>
    )
  }

  return (
    <div className='w-full h-full flex flex-col'>
      {/* Header */}
      <div className='text-center my-8 flex-shrink-0 max-w-[66%] mx-auto'>
        {title && (
          <Heading as='h2' fontSize='fontSize4Xl' lineHeight='lineHeight3Xl' className='mb-4'>
            {title}
          </Heading>
        )}
        {subtitle && (
          <Paragraph className='mb-16 text-gray-600 dark:text-gray-400' fontSize='fontSizeXl'>
            {subtitle}
          </Paragraph>
        )}
      </div>

      {/* Content */}
      <div className='flex-1 flex flex-col'>
        {/* Mobile Carousel (sempre) */}
        <div className='flex-1 flex flex-col md:hidden'>
          <div className='flex-1 overflow-x-auto scrollbar-hide'>
            <div className='flex gap-4 flex-nowrap p-4'>
              {items.map((item: ColumnItem, index) => (
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

        {/* Desktop */}
        <div className='hidden md:flex md:flex-col flex-1'>
          {isCarousel ? (
            // Desktop Carousel View
            <>
              <div className='flex-1 relative flex items-center justify-center'>
                {renderItem(items[currentIndex], currentIndex)}
                <button
                  onClick={handlePrevious}
                  className='absolute left-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition z-10'
                  aria-label='Previous item'>
                  ←
                </button>
                <button
                  onClick={handleNext}
                  className='absolute right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition z-10'
                  aria-label='Next item'>
                  →
                </button>
              </div>
              {/* Desktop Carousel Dots */}
              <div className='flex justify-center gap-2 mt-4'>
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
            </>
          ) : (
            // Desktop Grid View
            <div className={`grid gap-8 ${getGridColsClass(items.length)}`}>
              {items.map((item: ColumnItem, index) => renderItem(item, index))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
