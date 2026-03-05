/* ============================================================================
 * Auto-generated from Contentful Content Models using scripts/generate-types.ts
 * 
 * Generated at: 2026-03-05T20:54:12.342Z
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

/**
 * Tipos customizados que não são auto-gerados pelo Contentful
 * Úteis para estruturas complexas ou campos JSON
 */

// TIMELINE
export type TTimelineItem = {
  title: string
  text: string
}

// ============================================================================
// GENERATED TYPES
// ============================================================================


export type TCtaGroupFields = {
  name: string;
  titleAndSubtitle?: EntryLink<unknown>;
  items: TCta[];
  direction?: boolean;
  alignment?: "left" | "center" | "right" | "full";
};


export type TCtaGroupEntrySkeleton = EntrySkeletonType<
  TCtaGroupFields,
  'ctaGroup'
>;


export type TCtaGroupEntry<L extends string = 'pt-PT'> =
  Entry<TCtaGroupEntrySkeleton, undefined, L>;

export type TCtaGroup = TCtaGroupEntry<'pt-PT'>;


export type TBlockWrapperFields = {
  name: string;
  content: EntryLink<unknown>;
  width?: "1/3" | "1/2" | "2/3" | "Full";
  backgroundColour?: "none" | "white" | "primary" | "secondary" | "alternative" | "neutral";
  backgroundImage?: AssetLink;
  paddingTop?: "none" | "xs" | "s" | "m" | "l" | "xl";
  paddingBottom?: "none" | "xs" | "s" | "m" | "l" | "xl";
  centerVertically?: boolean;
};


export type TBlockWrapperEntrySkeleton = EntrySkeletonType<
  TBlockWrapperFields,
  'blockWrapper'
>;


export type TBlockWrapperEntry<L extends string = 'pt-PT'> =
  Entry<TBlockWrapperEntrySkeleton, undefined, L>;

export type TBlockWrapper = TBlockWrapperEntry<'pt-PT'>;


export type TGenericContentColumnsFields = {
  name: string;
  title?: string;
  subtitle?: string;
  items: EntryLink<unknown>[];
  isCarousel?: boolean;
  isNumbered?: boolean;
};


export type TGenericContentColumnsEntrySkeleton = EntrySkeletonType<
  TGenericContentColumnsFields,
  'genericContentColumns'
>;


export type TGenericContentColumnsEntry<L extends string = 'pt-PT'> =
  Entry<TGenericContentColumnsEntrySkeleton, undefined, L>;

export type TGenericContentColumns = TGenericContentColumnsEntry<'pt-PT'>;


export type TBreadcrumbsFields = {
  name?: string;
  style?: "default" | "large";
};


export type TBreadcrumbsEntrySkeleton = EntrySkeletonType<
  TBreadcrumbsFields,
  'breadcrumbs'
>;


export type TBreadcrumbsEntry<L extends string = 'pt-PT'> =
  Entry<TBreadcrumbsEntrySkeleton, undefined, L>;

export type TBreadcrumbs = TBreadcrumbsEntry<'pt-PT'>;


export type TCtaFields = {
  ctaText: string;
  ctaUrl: string;
  ctaBgColour?: "primary" | "secondary" | "alternative" | "neutral" | "white";
};


export type TCtaEntrySkeleton = EntrySkeletonType<
  TCtaFields,
  'cta'
>;


export type TCtaEntry<L extends string = 'pt-PT'> =
  Entry<TCtaEntrySkeleton, undefined, L>;

export type TCta = TCtaEntry<'pt-PT'>;


export type TTimelineFields = {
  name: string;
  timeline?: string;
  items?: Record<string, unknown>;
  direction?: boolean;
  color?: boolean;
};


export type TTimelineEntrySkeleton = EntrySkeletonType<
  TTimelineFields,
  'timeline'
>;


export type TTimelineEntry<L extends string = 'pt-PT'> =
  Entry<TTimelineEntrySkeleton, undefined, L>;

export type TTimeline = TTimelineEntry<'pt-PT'>;


export type TLargeHeroFields = {
  name: string;
  content?: EntryLink<unknown>;
};


export type TLargeHeroEntrySkeleton = EntrySkeletonType<
  TLargeHeroFields,
  'largeHero'
>;


export type TLargeHeroEntry<L extends string = 'pt-PT'> =
  Entry<TLargeHeroEntrySkeleton, undefined, L>;

export type TLargeHero = TLargeHeroEntry<'pt-PT'>;


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


export type TFaqsFields = {
  name: string;
  title?: string;
  items: EntryLink<unknown>[];
};


export type TFaqsEntrySkeleton = EntrySkeletonType<
  TFaqsFields,
  'faqs'
>;


export type TFaqsEntry<L extends string = 'pt-PT'> =
  Entry<TFaqsEntrySkeleton, undefined, L>;

export type TFaqs = TFaqsEntry<'pt-PT'>;


export type THeroFields = {
  name: string;
  title: string;
  text?: Document;
  backgroundImage: AssetLink;
  cta?: TCtaEntry<L>;
};


export type THeroEntrySkeleton = EntrySkeletonType<
  THeroFields,
  'hero'
>;


export type THeroEntry<L extends string = 'pt-PT'> =
  Entry<THeroEntrySkeleton, undefined, L>;

export type THero = THeroEntry<'pt-PT'>;
