import { getAllDynamicPages } from '@/services/getAllDynamicPages'
import { Nav } from '@/components/Header/Nav'

export async function Header() {
  let navLinks: Array<{ label: string; href: string }> = []

  try {
    // Buscar todas as páginas dinâmicas
    const pages = await getAllDynamicPages()

    // Transformar em links
    navLinks = pages.map((page) => ({
      label: page.fields.name,
      href: `/${page.fields.slug}`
    }))
  } catch (error) {
    console.error('Erro ao carregar navegação:', error)
    // navLinks permanece vazia se erro
  }

  return <Nav links={navLinks} />
}
