import { notFound } from 'next/navigation'
import { Block } from '@/components/blocks/Block'
import { getDynamicPage } from '@/services/getDynamicPage'
import { paddingTopMap, paddingBottomMap, colorClassMap } from '@/lib/blockStyleMaps'
import { getWidthPercentage, groupBlocksByRow, type BlockWidth } from '@/lib/blockLayout'
import type { TDynamicPage, TBlockWrapper } from '@/types/contentful-models'

// Usado para pre-render no build
export { generateStaticParams } from '@/services/getAllDynamicPages'

type DynamicPageProps = {
  readonly params: Promise<{
    slug: string[]
  }>
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
            groupBlocksByRow(page.fields.blocks as TBlockWrapper[]).map((row: TBlockWrapper[]) => {
              const firstBlock = row[0]
              const backgroundColour = (firstBlock.fields as Record<string, unknown>)
                .backgroundColour as string | undefined
              const backgroundImage = (firstBlock.fields as Record<string, unknown>)
                .backgroundImage as Record<string, unknown> | undefined
              const paddingTop = (firstBlock.fields as Record<string, unknown>).paddingTop as
                | string
                | undefined
              const paddingBottom = (firstBlock.fields as Record<string, unknown>).paddingBottom as
                | string
                | undefined

              // Se houver imagem, usa-a; caso contrário, usa cor de fundo
              const bgImageFile = backgroundImage?.fields as Record<string, unknown> | undefined
              const hasBackgroundImage = !!bgImageFile?.file

              const bgClass = hasBackgroundImage
                ? ''
                : (colorClassMap[backgroundColour ?? 'white'] ?? 'bg-white')
              const ptClass = paddingTopMap[paddingTop ?? 'm'] ?? 'padding-top-m'
              const pbClass = paddingBottomMap[paddingBottom ?? 'm'] ?? 'padding-bottom-m'

              // Construir style para background image
              const backgroundImageUrl = hasBackgroundImage
                ? `https:${(bgImageFile?.file as Record<string, unknown>)?.url}`
                : undefined

              const rowStyle = backgroundImageUrl
                ? {
                    backgroundImage: `url('${backgroundImageUrl}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }
                : undefined

              return (
                <div
                  key={`row-${firstBlock.sys.id}`}
                  className={`block-row w-full ${bgClass}`}
                  style={rowStyle as React.CSSProperties}>
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
                            className='block-wrapper flex flex-shrink-0'>
                            <Block block={block} />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <p className='text-gray-500 dark:text-gray-400'>Sem blocks</p>
          )}
        </div>
      </main>
    </div>
  )
}
