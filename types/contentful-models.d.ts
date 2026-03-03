/* ============================================================================
 * Auto-generated from Contentful Content Models using scripts/generate-types.ts
 *
 * Generated at: 2026-03-03T23:30:32.469Z
 * Space ID: zh8lljn49bf0
 * Environment: master
 *
 * Para regenerar execute: pnpm types:generate
 * ============================================================================ */

import type { Entry, EntrySkeletonType, Asset } from 'contentful'
import type { Document } from '@contentful/rich-text-types'

// ============================================================================
// BASE TYPES
// ============================================================================

export type SysMeta = {
  id: string
  createdAt?: string
  updatedAt?: string
}

export type AssetLink = Asset

export type EntryLink<T> = {
  sys: { type: 'Link'; linkType: 'Entry'; id: string }
} & Partial<T>

// ============================================================================
// CUSTOM TYPES (adicione manualmente aqui tipos customizados)
// ============================================================================

// Exemplo:
// export type TSectionType = 'hero' | 'features' | 'cta';

// ============================================================================
// GENERATED TYPES
// ============================================================================

export type TDynamicPageFields = {
  name: string
  slug: string
}

export type TDynamicPageEntrySkeleton = EntrySkeletonType<TDynamicPageFields, 'dynamicPage'>

export type TDynamicPageEntry<L extends string = 'pt-PT'> = Entry<
  TDynamicPageEntrySkeleton,
  undefined,
  L
>

export type TDynamicPage = TDynamicPageEntry<'pt-PT'>
