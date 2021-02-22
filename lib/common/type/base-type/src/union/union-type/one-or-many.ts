import type { NonEmptySeq } from '../../sequence'

/**
 * **Either One Or Squence Of A Type.** \
 * *Union Type* of given element type or non-empty tuple of such.
 *
 * `T` or `N`-Tuple of type `T = unknown`, where `N > 1`.
 *
 * @typeParam T - instance or array element type
 */
export type OneOrMany<T extends unknown = unknown> = T | NonEmptySeq<T>
