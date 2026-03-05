import type { TBlockWrapper } from '@/types/contentful-models'

export type BlockWidth = '1/3' | '1/2' | '2/3' | 'Full' | undefined

export function getWidthPercentage(width: BlockWidth): string {
  const widthMap: Record<string, string> = {
    '1/3': 'calc(33.333% - 1.333rem)',
    '1/2': 'calc(50% - 1rem)',
    '2/3': 'calc(66.666% - 1.333rem)',
    Full: '100%'
  }
  return widthMap[width || 'Full'] || '100%'
}

export function getWidthFraction(width: BlockWidth): number {
  const fractions: Record<string, number> = {
    '1/3': 1 / 3,
    '1/2': 1 / 2,
    '2/3': 2 / 3,
    Full: 1
  }
  return fractions[width || 'Full'] || 1
}

export function groupBlocksByRow(blocks: TBlockWrapper[]): TBlockWrapper[][] {
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
