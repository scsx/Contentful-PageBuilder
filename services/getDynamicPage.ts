import { contentfulClient } from '@/lib/contentful'
import type { TDynamicPage } from '@/types/contentful-models'

/**
 * Busca uma página dinâmica pelo slug
 * @param slug - O slug da página (ex: "5g/info")
 * @returns A página encontrada ou null
 */
export async function getDynamicPage(slug: string): Promise<TDynamicPage | null> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'dynamicPage',
      'fields.slug': slug,
      limit: 1
    })

    if (response.items.length === 0) {
      return null
    }

    return response.items[0] as unknown as TDynamicPage
  } catch (error) {
    console.error(`Erro ao buscar página com slug "${slug}":`, error)
    throw error
  }
}
