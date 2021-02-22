import type { OneOrMany } from '../../union'

import type { Boolish } from './boolish'
import type { Falsy } from './falsy'
import type { Truthy } from './truthy'

/**
 * **One Or Many `Falsy`**
 *
 * Either a single `Falsy`, or a non-empty tuple of `Falsy`.
 */
export type Falsiness = OneOrMany<Falsy>

 /**
  * **One Or Many `Truthy`**
  *
  * Either a single `Truthy`, or a non-empty tuple of `Truthy`.
  */
export type Truthiness = OneOrMany<Truthy>

 /**
  * **One Or Many `Boolish`**
  *
  * Either a single `Boolish`, or a non-empty tuple of `Boolish`.
  */
export type Boolishes = OneOrMany<Boolish>
