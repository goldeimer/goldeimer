import type { NumOrNumStr } from '../../union'

import type { FalseLikeNumber, FalseLikeString } from './boolean-like-value'
import type { Nullish } from '../../primitive'

/**
 * **Representations Of `false`** \
 * Set of values which may be elected to indicate "falsiness", excluding `false`
 * itself.
 *
 * *Union Type* of all value types interpretable as (and thus coercible to)
 * `false`.
 */
export type FalseLike = (
    | NumOrNumStr<FalseLikeNumber>
    | FalseLikeString
    | Nullish
)
