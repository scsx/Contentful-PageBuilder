'use client'

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

interface GenericColumnsProps {
  readonly data: TGenericContentColumns
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
  const fields = data.fields as Record<string, unknown>
  const title = String(fields?.title || '')
  const subtitle = String(fields?.subtitle || '')
  const items = Array.isArray(fields?.items) ? (fields.items as ColumnItem[]) : []

  return (
    <div className='w-full'>
      <div className='text-center my-8'>
        {title && (
          <Heading as='h2' fontSize='fontSize4Xl' className='mb-4'>
            {title}
          </Heading>
        )}
        {subtitle && (
          <Paragraph className='mb-16 text-gray-600 dark:text-gray-400' fontSize='fontSizeXl'>
            {subtitle}
          </Paragraph>
        )}
      </div>

      <div className={`grid gap-8 ${getGridColsClass(items.length)}`}>
        {items && items.length > 0 ? (
          items.map((item: ColumnItem, index) => {
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
              itemImage && 'fields' in itemImage
                ? (itemImage as Asset).fields?.file?.url
                : undefined

            return (
              <Box
                key={`${item.sys.id}-${index}`}
                className='overflow-hidden bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm'>
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
          })
        ) : (
          <p className='text-gray-500 dark:text-gray-400'>Sem items</p>
        )}
      </div>
    </div>
  )
}
