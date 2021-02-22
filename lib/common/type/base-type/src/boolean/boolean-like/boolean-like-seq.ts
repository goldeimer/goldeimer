import type { NonEmptySeq } from '../../sequence'

import type { BooleanLike } from './boolean-like'
import type { FalseLike } from './false-like'
import type { TrueLike } from './true-like'

/**
 * **Non-Empty Sequence Of `FalseLike`**
 * Any tuple of `FalseLike`.
 */
export type FalseLikeSeq = NonEmptySeq<FalseLike>

/**
 * **Non-Empty Sequence Of `TrueLike`**
 * Any tuple of `TrueLike`.
 */
export type TrueLikeSeq = NonEmptySeq<TrueLike>

/**
 * **Non-Empty Sequence Of `BooleanLike`**
 * Any tuple of `BooleanLike`.
 */
export type BooleanLikeSeq = NonEmptySeq<BooleanLike>
