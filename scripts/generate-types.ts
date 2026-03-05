/* eslint-disable @typescript-eslint/no-explicit-any */
import 'dotenv/config.js'
import { writeFileSync } from 'node:fs'

/**
 * Script para gerar tipos TypeScript a partir dos modelos de conteúdo do Contentful
 *
 * Como usar:
 * 1. Defina os seus content types no objeto CONTENT_TYPE_NAMES abaixo
 * 2. Certifique-se que tem as variáveis de ambiente configuradas:
 *    - CONTENTFUL_SPACE_ID
 *    - CONTENTFUL_ENVIRONMENT (opcional, default: 'master')
 *    - CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN
 * 3. Execute: pnpm types:generate
 *
 * Referência de exemplo em: scripts/example.ts
 */

// ============================================================================
// 1. DEFINA OS SEUS CONTENT TYPES
// ============================================================================
// Mapeie aqui os IDs dos seus content types do Contentful com os nomes
// TypeScript que quer usar. Exemplo:
//
// const CONTENT_TYPE_NAMES: Record<string, string> = {
//   myContentTypeId: 'TMyContentType',
//   anotherType: 'TAnotherType',
// }

const CONTENT_TYPE_NAMES: Record<string, string> = {
  dynamicPage: 'TDynamicPage',
  blockWrapper: 'TBlockWrapper',
  faqs: 'TFaqs',
  genericContentColumns: 'TGenericContentColumns',
  largeHero: 'TLargeHero',
  hero: 'THero'
}

const CONTENT_TYPE_IDS = Object.keys(CONTENT_TYPE_NAMES)

if (CONTENT_TYPE_IDS.length === 0) {
  console.warn('⚠️  Nenhum content type definido em CONTENT_TYPE_NAMES')
  console.log('Defina os seus content types em scripts/generate-types.ts linha ~30')
  process.exit(0)
}

// ============================================================================
// 2. CONFIGURAÇÃO DO CONTENTFUL
// ============================================================================

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID
const ENV = process.env.CONTENTFUL_ENVIRONMENT || 'master'
const CMA_TOKEN = process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN
const API_ENDPOINT = `https://api.contentful.com/spaces/${SPACE_ID}/environments/${ENV}`

// Validar variáveis de ambiente
if (!SPACE_ID || !CMA_TOKEN) {
  console.error('❌ Erro: Variáveis de ambiente obrigatórias não encontradas')
  console.error(`   CONTENTFUL_SPACE_ID: ${SPACE_ID ? '✓' : '✗'}`)
  console.error(`   CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN: ${CMA_TOKEN ? '✓' : '✗'}`)
  console.error(`   CONTENTFUL_ENVIRONMENT: ${ENV}`)
  process.exit(1)
}

// ============================================================================
// 3. FUNÇÕES DE TRANSFORMAÇÃO DE TIPOS
// ============================================================================

/**
 * Converte um tipo base de Contentful em tipo TypeScript equivalente
 */
const baseType = (field: any, ctIdToName: Record<string, string>): string => {
  // Função auxiliar para resolver tipos de linked entries
  const getLinkedEntryTypes = (fieldOrItems: any): string | null => {
    const linkValidation = (fieldOrItems.validations || []).find((v: any) => v.linkContentType)
    const ids: string[] | undefined = linkValidation?.linkContentType
    if (!ids?.length) return null

    const entryTypeNames = ids.map((id) => ctIdToName[id]).filter(Boolean)

    if (!entryTypeNames.length) return null
    if (entryTypeNames.length === 1) return entryTypeNames[0]
    return entryTypeNames.join(' | ')
  }

  // Mapear types do Contentful para TypeScript
  switch (field.type) {
    case 'Symbol':
    case 'Text':
    case 'Slug':
    case 'Date': {
      // Se tem validação 'in', use enum
      const inVals = (field.validations || []).find((v: any) => v.in)?.in
      return inVals?.length ? inVals.map((s: string) => JSON.stringify(s)).join(' | ') : 'string'
    }
    case 'Integer':
    case 'Number':
      return 'number'
    case 'Boolean':
      return 'boolean'
    case 'Location':
      return '{ lat: number; lon: number }'
    case 'Object':
      return 'Record<string, unknown>'
    case 'RichText':
      return 'Document'
    case 'Link':
      if (field.linkType === 'Asset') return 'AssetLink'
      if (field.linkType === 'Entry') {
        const linked = getLinkedEntryTypes(field)
        return linked ? `${linked}Entry<L>` : 'EntryLink<unknown>'
      }
      return 'unknown'
    case 'Array':
      if (field.items?.type === 'Link' && field.items.linkType === 'Entry') {
        const linked = getLinkedEntryTypes(field.items)
        return linked ? `${linked}[]` : 'EntryLink<unknown>[]'
      }
      if (field.items?.type === 'Link' && field.items.linkType === 'Asset') {
        return 'AssetLink[]'
      }
      if (field.items?.type === 'Symbol') return 'string[]'
      return 'unknown[]'
    default:
      return 'unknown'
  }
}

/**
 * Gera uma linha de campo TypeScript (e.g., "title?: string;")
 */
const fieldLine = (f: any, ctIdToName: Record<string, string>): string => {
  const t = baseType(f, ctIdToName)
  const optional = f.required ? '' : '?'
  return `  ${f.id}${optional}: ${t};`
}

/**
 * Converte string em PascalCase (e.g., "my-type" -> "MyType")
 */
const toPascalCase = (s = ''): string =>
  s.replace(/(^|[-_]\w)/g, (m: string) => m.replace(/[-_]/g, '').toUpperCase())

/**
 * Determina o nome da interface TypeScript para um content type
 */
const getInterfaceName = (ct: any): string => {
  const ctId = ct.sys?.id
  return CONTENT_TYPE_NAMES[ctId] || toPascalCase(ctId)
}

// ============================================================================
// 4. CABEÇALHO DO FICHEIRO DE TIPOS
// ============================================================================

function generateHeader(spaceId: string, env: string): string {
  return `/* ============================================================================
 * Auto-generated from Contentful Content Models using scripts/generate-types.ts
 * 
 * Generated at: ${new Date().toISOString()}
 * Space ID: ${spaceId}
 * Environment: ${env}
 * 
 * Para regenerar execute: pnpm types:generate
 * ============================================================================ */

import type { Entry, EntrySkeletonType, Asset } from 'contentful';
import type { Document } from '@contentful/rich-text-types';

// ============================================================================
// BASE TYPES
// ============================================================================

export type SysMeta = { 
  id: string; 
  createdAt?: string; 
  updatedAt?: string;
};

export type AssetLink = Asset;

export type EntryLink<T> = {
  sys: { type: 'Link'; linkType: 'Entry'; id: string };
} & Partial<T>;

// ============================================================================
// CUSTOM TYPES (adicione manualmente aqui tipos customizados)
// ============================================================================

// Exemplo:
// export type TSectionType = 'hero' | 'features' | 'cta';

// ============================================================================
// GENERATED TYPES
// ============================================================================
`
}

// ============================================================================
// 5. FETCH & GENERATE
// ============================================================================

/**
 * Busca definições de content types do Contentful Management API
 */
async function fetchContentTypes(ids: string[]): Promise<any[]> {
  const qs = ids.length ? `?sys.id[in]=${ids.join(',')}` : ''
  const url = `${API_ENDPOINT}/content_types${qs}`

  console.log('📡 A buscar content types do Contentful...')

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${CMA_TOKEN}`,
      'Content-Type': 'application/vnd.contentful.management.v1+json'
    }
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Erro CMA (${response.status}): ${error}`)
  }

  const data = await response.json()
  return data.items as any[]
}

/**
 * Gera um ficheiro de tipos TypeScript dos content types
 */
async function generateTypes(): Promise<void> {
  try {
    console.log('🚀 A gerar tipos Contentful...')

    // 1. Buscar content types
    const contentTypes = await fetchContentTypes(CONTENT_TYPE_IDS)

    if (contentTypes.length === 0) {
      console.error('❌ Nenhum content type encontrado')
      process.exit(1)
    }

    // 2. Construir mapa de IDs para nomes
    const ctIdToName: Record<string, string> = {}
    for (const ct of contentTypes) {
      ctIdToName[ct.sys.id] = getInterfaceName(ct)
    }

    // 3. Iniciar chunks com cabeçalho
    const header = generateHeader(SPACE_ID, ENV)
    const chunks: string[] = [header]

    // 4. Gerar tipos para cada content type
    for (const ct of contentTypes) {
      const ctId = ct.sys.id
      const interfaceName = getInterfaceName(ct)
      const fieldCount = (ct.fields || []).filter((f: any) => !f.omitted).length

      console.log(`  • ${interfaceName} (${ctId}) - ${fieldCount} campos`)

      // Gerar campos
      const fields = (ct.fields || [])
        .filter((f: any) => !f.omitted)
        .map((f: any) => fieldLine(f, ctIdToName))
        .join('\n')

      // Tipo de campos
      chunks.push(`
export type ${interfaceName}Fields = {
${fields}
};
`)

      // Skeleton entrada
      chunks.push(`
export type ${interfaceName}EntrySkeleton = EntrySkeletonType<
  ${interfaceName}Fields,
  '${ctId}'
>;
`)

      // Tipo de entrada
      chunks.push(`
export type ${interfaceName}Entry<L extends string = 'pt-PT'> =
  Entry<${interfaceName}EntrySkeleton, undefined, L>;

export type ${interfaceName} = ${interfaceName}Entry<'pt-PT'>;
`)
    }

    // 5. Escrever ficheiro
    const outputPath = 'types/contentful-models.d.ts'
    const outputContent = chunks.join('\n')

    writeFileSync(outputPath, outputContent)

    const totalFields = contentTypes.reduce(
      (acc, ct) => acc + (ct.fields?.filter((f: any) => !f.omitted).length || 0),
      0
    )
    console.log(`
✅ Tipos gerados com sucesso!
   Ficheiro: types/contentful-models.d.ts
   Content types: ${contentTypes.length}
   Campos totais: ${totalFields}
`)
  } catch (error) {
    console.error('❌ Erro ao gerar tipos:', error)
    process.exit(1)
  }
}

// ============================================================================
// EXECUTAR
// ============================================================================

generateTypes()
