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
        {/* Página encontrada */}
        <div>
          <h1 className='text-4xl font-bold mb-4 text-black dark:text-white'>{page.fields.name}</h1>
          <p className='text-gray-600 dark:text-gray-400'>Slug: {page.fields.slug}</p>
        </div>

        {/* Blocks */}
        <div className='flex flex-col gap-8 border-t pt-8'>
          {Array.isArray(page.fields.blocks) &&
          (page.fields.blocks as TBlockWrapper[]).length > 0 ? (
            (page.fields.blocks as TBlockWrapper[]).map((block: TBlockWrapper, index: number) => (
              <Block key={`${block.sys.id}-${index}`} block={block} />
            ))
          ) : (
            <p className='text-gray-500 dark:text-gray-400'>Sem blocks</p>
          )}
        </div>
      </main>
    </div>
  )
}
