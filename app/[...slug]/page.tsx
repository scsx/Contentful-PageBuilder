import { notFound } from 'next/navigation'
import { Block } from '@/components/blocks/Block'
import { getDynamicPage } from '@/services/getDynamicPage'
import { paddingTopMap, paddingBottomMap, colorClassMap } from '@/lib/blockStyleMaps'
import type { TDynamicPage, TBlockWrapper } from '@/types/contentful-models'

// Usado para pre-render no build
export { generateStaticParams } from '@/services/getAllDynamicPages'

type DynamicPageProps = {
  readonly params: Promise<{
    slug: string[]
  }>
}

type BlockWidth = '1/3' | '1/2' | '2/3' | 'Full' | undefined

function getWidthPercentage(width: BlockWidth): string {
  const widthMap: Record<string, string> = {
    '1/3': 'calc(33.333% - 1.333rem)',
    '1/2': 'calc(50% - 1rem)',
    '2/3': 'calc(66.666% - 1.333rem)',
    Full: '100%'
  }
  return widthMap[width || 'Full'] || '100%'
}

function getWidthFraction(width: BlockWidth): number {
  const fractions: Record<string, number> = {
    '1/3': 1 / 3,
    '1/2': 1 / 2,
    '2/3': 2 / 3,
    Full: 1
  }
  return fractions[width || 'Full'] || 1
}

function groupBlocksByRow(blocks: TBlockWrapper[]): TBlockWrapper[][] {
  const rows: TBlockWrapper[][] = []
  let currentRow: TBlockWrapper[] = []
  let currentFraction = 0

  blocks.forEach((block) => {
    const width = (block.fields.width || 'Full') as BlockWidth
    const fraction = getWidthFraction(width)

    if (currentFraction + fraction <= 1) {
      currentRow.push(block)
      currentFraction += fraction
    } else {
      if (currentRow.length > 0) {
        rows.push(currentRow)
      }
      currentRow = [block]
      currentFraction = fraction
    }
  })

  if (currentRow.length > 0) {
    rows.push(currentRow)
  }

  return rows
}

export default async function DynamicPage({ params }: DynamicPageProps) {
  const { slug } = await params
  const slugPath = slug.join('/')

  let page: TDynamicPage | null = null

  try {
    page = await getDynamicPage(slugPath)

    if (!page) {
      notFound()
    }
  } catch (error) {
    console.error('Erro ao buscar página:', error)
    notFound()
  }

  return (
    <div className='min-h-screen bg-white dark:bg-black'>
      <main className='flex flex-col'>
        {/* Blocks */}
        <div className='flex flex-col'>
          {Array.isArray(page.fields.blocks) &&
          (page.fields.blocks as TBlockWrapper[]).length > 0 ? (
            groupBlocksByRow(page.fields.blocks as TBlockWrapper[]).map(
              (row: TBlockWrapper[], rowIndex: number) => {
                const firstBlock = row[0]
                const backgroundColour = (firstBlock.fields as Record<string, unknown>)
                  .backgroundColour as string | undefined
                const paddingTop = (firstBlock.fields as Record<string, unknown>).paddingTop as
                  | string
                  | undefined
                const paddingBottom = (firstBlock.fields as Record<string, unknown>)
                  .paddingBottom as string | undefined
                const bgClass = colorClassMap[backgroundColour || 'white'] || 'bg-white'
                const ptClass = paddingTopMap[paddingTop || 'm'] || 'padding-top-m'
                const pbClass = paddingBottomMap[paddingBottom || 'm'] || 'padding-bottom-m'

                return (
                  <div key={`row-${rowIndex}`} className={`w-full ${bgClass}`}>
                    <div className={`container relative ${ptClass} ${pbClass}`}>
                      <div className='flex flex-wrap gap-8 items-stretch'>
                        {row.map((block: TBlockWrapper, blockIndex: number) => {
                          const blockWidth = (block.fields as Record<string, unknown>)
                            .width as BlockWidth
                          const widthStyle = getWidthPercentage(blockWidth)

                          return (
                            <div
                              key={`${block.sys.id}-${blockIndex}`}
                              style={{ width: widthStyle, minWidth: 0 }}
                              className='flex flex-shrink-0'>
                              <div className='w-full'>
                                <Block block={block} />
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )
              }
            )
          ) : (
            <p className='text-gray-500 dark:text-gray-400'>Sem blocks</p>
          )}
        </div>
      </main>
    </div>
  )
}
