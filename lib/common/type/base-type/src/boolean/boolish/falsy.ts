import type { FalseLike } from '../boolean-like'

/**
 * **Representations Of `false`** \
 * Set of values which may be elected to indicate "falsiness".
 *
 * *Union Type* of all value types interpretable as (and thus coercible to)
 * `false`.
 */
export type Falsy = false | FalseLike
