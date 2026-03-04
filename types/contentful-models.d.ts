/* ============================================================================
 * Auto-generated from Contentful Content Models using scripts/generate-types.ts
 * 
 * Generated at: 2026-03-04T12:25:35.348Z
 * Space ID: zh8lljn49bf0
 * Environment: master
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


export type TGenericContentColumnsFields = {
  name: string;
  title?: string;
  subtitle?: string;
  items: EntryLink<unknown>[];
};


export type TGenericContentColumnsEntrySkeleton = EntrySkeletonType<
  TGenericContentColumnsFields,
  'genericContentColumns'
>;


export type TGenericContentColumnsEntry<L extends string = 'pt-PT'> =
  Entry<TGenericContentColumnsEntrySkeleton, undefined, L>;

export type TGenericContentColumns = TGenericContentColumnsEntry<'pt-PT'>;


export type TBlockWrapperFields = {
  name: string;
  content: TFaqs | THeroEntry<L>;
  width?: "1/3" | "1/2" | "2/3" | "Full";
};


export type TBlockWrapperEntrySkeleton = EntrySkeletonType<
  TBlockWrapperFields,
  'blockWrapper'
>;


export type TBlockWrapperEntry<L extends string = 'pt-PT'> =
  Entry<TBlockWrapperEntrySkeleton, undefined, L>;

export type TBlockWrapper = TBlockWrapperEntry<'pt-PT'>;


export type TDynamicPageFields = {
  name: string;
  slug: string;
  blocks?: TBlockWrapper[];
};


export type TDynamicPageEntrySkeleton = EntrySkeletonType<
  TDynamicPageFields,
  'dynamicPage'
>;


export type TDynamicPageEntry<L extends string = 'pt-PT'> =
  Entry<TDynamicPageEntrySkeleton, undefined, L>;

export type TDynamicPage = TDynamicPageEntry<'pt-PT'>;


export type THeroFields = {
  name: string;
  title: string;
  text?: Document;
  backgroundImage: AssetLink;
  cta?: EntryLink<unknown>;
};


export type THeroEntrySkeleton = EntrySkeletonType<
  THeroFields,
  'hero'
>;


export type THeroEntry<L extends string = 'pt-PT'> =
  Entry<THeroEntrySkeleton, undefined, L>;

export type THero = THeroEntry<'pt-PT'>;


export type TFaqsFields = {
  name: string;
  items: EntryLink<unknown>[];
};


export type TFaqsEntrySkeleton = EntrySkeletonType<
  TFaqsFields,
  'faqs'
>;


export type TFaqsEntry<L extends string = 'pt-PT'> =
  Entry<TFaqsEntrySkeleton, undefined, L>;

export type TFaqs = TFaqsEntry<'pt-PT'>;
