import type { OneOrMany } from '../../union'

import type { BooleanLike } from './boolean-like'
import type { FalseLike } from './false-like'
import type { TrueLike } from './true-like'

/**
 * **One Or Many `FalseLike`**
 *
 * Either a single `FalseLike`, or a non-empty tuple of `FalseLike`.
 */
export type FalseLikes = OneOrMany<FalseLike>

 /**
  * **One Or Many `TrueLike`**
  *
  * Either a single `TrueLike`, or a non-empty tuple of `TrueLike`.
  */
export type TrueLikes = OneOrMany<TrueLike>

 /**
  * **One Or Many `BooleanLike`**
  *
  * Either a single `BooleanLike`, or a non-empty tuple of `BooleanLike`.
  */
export type BooleanLikes = OneOrMany<BooleanLike>
