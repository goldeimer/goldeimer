import type { NumOrNumStr } from '../../union'

import type { TrueLikeNumber, TrueLikeString } from './boolean-like-value'

/**
 * **Representations Of `true`** \
 * Set of values which may be elected to indicate "truthiness", excluding `true`
 * itself.
 *
 * *Union Type* of all value types interpretable as (and thus coercible to)
 * `true`.
 */
export type TrueLike = (
    | NumOrNumStr<TrueLikeNumber>
    | TrueLikeString
)
