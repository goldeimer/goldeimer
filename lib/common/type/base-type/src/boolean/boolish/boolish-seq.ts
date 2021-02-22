import type { NonEmptySeq } from '../../sequence'

import type { Boolish } from './boolish'
import type { Falsy } from './falsy'
import type { Truthy } from './truthy'

/**
 * **Non-Empty Sequence Of `Falsy`**
 * Any tuple of `Falsy`.
 */
export type FalsySeq = NonEmptySeq<Falsy>

/**
 * **Non-Empty Sequence Of `TrueLike`**
 * Any tuple of `TrueLike`.
 */
export type TruthySeq = NonEmptySeq<Truthy>

/**
 * **Non-Empty Sequence Of `Boolish`**
 * Any tuple of `Boolish`.
 */
export type BoolishSeq = NonEmptySeq<Boolish>
