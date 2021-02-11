import { fmtIf } from '@goldeimer/string'

import type { ScopeAndSlug } from './name-common'

export function fullName({ scope, slug }: ScopeAndSlug) {
    return `${fmtIf(scope, '@', '/')}${slug}`
}
