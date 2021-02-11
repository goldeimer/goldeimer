import type { Slug } from '@goldeimer/url'

import type { ScopeAndSlug } from './name-common'

import { fullName } from './full-name'
import { scopedName } from './scoped-name'

export interface NameInfo extends ScopeAndSlug {
    full: string,
    scoped: Slug,
}

export function nameInfo(scopeAndSlug: ScopeAndSlug): NameInfo {
    return {
        ...scopeAndSlug,
        full: fullName(scopeAndSlug),
        scoped: scopedName(scopeAndSlug)
    }
}
