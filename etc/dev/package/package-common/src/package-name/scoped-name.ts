import { fmtIf } from '@goldeimer/string'

import type { ScopeAndSlug } from './name-common'

export function scopedName({ scope, slug }: ScopeAndSlug) {
    return `${fmtIf(scope, '', '-')}${slug}`
}
