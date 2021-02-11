import type { Slug } from '@goldeimer/url'
export type { Slug }

export interface ScopeAndSlug {
    scope?: Slug,
    slug: Slug
}

export const DefaultScopeAndSlug = {
    scope: 'goldeimer',
    slug: 'sample-package'
}
