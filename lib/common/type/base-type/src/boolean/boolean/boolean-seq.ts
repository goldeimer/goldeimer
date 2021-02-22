import type { NonEmptySeq } from '../../sequence'

/**
 * **Non-Empty Sequence Of `false`**
 * Any tuple of `false`.
 */
export type FalseSeq = NonEmptySeq<false>

/**
 * **Non-Empty Sequence Of `true`**
 * Any tuple of `true`.
 */
export type TrueSeq = NonEmptySeq<true>

/**
 * **Non-Empty Sequence Of `boolean`**
 * Any tuple of `boolean`.
 */
export type BooleanSeq = NonEmptySeq<boolean>
