import { NonEmptySeqOf } from '../sequence'

/**
 * Generic Non-empty List
 *
 * Instance or `N`-Tuple of type `T = unknown`, where `N > 0`
 *
 * @typeParam T - Contained value type (union of individual member's types)
 */
export type OneOrMany<T = unknown> = T | NonEmptySeqOf<T>
