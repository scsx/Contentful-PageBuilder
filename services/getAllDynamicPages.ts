import { contentfulClient } from '@/lib/contentful'
import type { TDynamicPage, TDynamicPageFields } from '@/types/contentful-models'

/**
 * Busca todas as páginas dinâmicas
 * @param limit - Número máximo de items a retornar (default: 100)
 * @returns Array de páginas dinâmicas
 */
export async function getAllDynamicPages(limit: number = 100): Promise<TDynamicPage[]> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'dynamicPage',
      limit
    })

    return response.items as unknown as TDynamicPage[]
  } catch (error) {
    console.error('Erro ao buscar todas as páginas dinâmicas:', error)
    throw error
  }
}

/**
 * Gera parâmetros estáticos para páginas dinâmicas (Next.js)
 * Útil para pre-render páginas no build
 */
export async function generateStaticParams() {
  try {
    const pages = await getAllDynamicPages()
    return pages.map((page) => ({
      slug: (page.fields as TDynamicPageFields).slug.split('/')
    }))
  } catch (error) {
    console.error('Erro ao gerar static params:', error)
    return []
  }
}
