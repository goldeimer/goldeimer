import type { TrueLike } from '../boolean-like'

/**
 * **Representations Of `true`** \
 * Set of values which may be elected to indicate "truthiness".
 *
 * *Union Type* of all value types interpretable as (and thus coercible to)
 * `true`.
 */
export type Truthy = true | TrueLike
