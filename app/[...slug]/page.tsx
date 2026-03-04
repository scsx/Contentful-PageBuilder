import { notFound } from 'next/navigation'
import { Block } from '@/components/blocks/Block'
import { getDynamicPage } from '@/services/getDynamicPage'
import type { TDynamicPage, TBlockWrapper } from '@/types/contentful-models'

// Usado para pre-render no build
export { generateStaticParams } from '@/services/getAllDynamicPages'

type DynamicPageProps = {
  readonly params: Promise<{
    slug: string[]
  }>
}

type BlockWidth = '1/3' | '1/2' | '2/3' | 'Full' | undefined

function getWidthFraction(width: BlockWidth): number {
  const fractions: Record<string, number> = {
    '1/3': 1 / 3,
    '1/2': 1 / 2,
    '2/3': 2 / 3,
    Full: 1
  }
  return fractions[width || 'Full'] || 1
}

function getGridTemplate(widths: BlockWidth[]): string {
  const fractionSum = widths.reduce((sum, w) => sum + getWidthFraction(w), 0)

  if (fractionSum === 1) {
    const counts: Record<string, number> = { '1/3': 0, '1/2': 0, '2/3': 0 }
    widths.forEach((w) => {
      if (w && w !== 'Full') counts[w]++
    })

    if (counts['1/3'] === 3) return 'grid-cols-3'
    if (counts['1/2'] === 2) return 'grid-cols-2'
    if (counts['2/3'] === 1 && counts['1/3'] === 1) return 'grid-cols-3'
  }

  return 'grid-cols-1'
}

function getColSpan(width: BlockWidth, gridCols: string): string {
  if (width === 'Full') return 'col-span-full'
  if (gridCols === 'grid-cols-3') {
    if (width === '2/3') return 'col-span-2'
    if (width === '1/3') return 'col-span-1'
  }
  if (gridCols === 'grid-cols-2') {
    if (width === '1/2') return 'col-span-1'
  }
  return 'col-span-1'
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
      <main className='flex flex-col gap-8 max-w-6xl mx-auto px-6 py-12'>
        {/* Blocks */}
        <div className='flex flex-col gap-8'>
          {Array.isArray(page.fields.blocks) &&
          (page.fields.blocks as TBlockWrapper[]).length > 0 ? (
            groupBlocksByRow(page.fields.blocks as TBlockWrapper[]).map(
              (row: TBlockWrapper[], rowIndex: number) => {
                const widths = row.map(
                  (b) => (b.fields as Record<string, unknown>).width as BlockWidth
                )
                const gridTemplate = getGridTemplate(widths)
                return (
                  <div key={`row-${rowIndex}`} className={`grid gap-8 ${gridTemplate}`}>
                    {row.map((block: TBlockWrapper, blockIndex: number) => {
                      const blockWidth = (block.fields as Record<string, unknown>)
                        .width as BlockWidth
                      const colSpan = getColSpan(blockWidth, gridTemplate)
                      return (
                        <div key={`${block.sys.id}-${blockIndex}`} className={colSpan}>
                          <Block block={block} />
                        </div>
                      )
                    })}
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
