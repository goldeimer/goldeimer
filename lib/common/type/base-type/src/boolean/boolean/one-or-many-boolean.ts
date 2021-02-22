import type { OneOrMany } from '../../union'

/**
 * **One or many `false`**
 *
 * Either a single `false`, or a non-empty tuple of `false`.
 */
export type Falses = OneOrMany<false>

 /**
  * **One or many `true`**
  *
  * Either a single `true`, or a non-empty tuple of `true`.
  */
export type Trues = OneOrMany<true>

 /**
  * One or many `boolean`
  *
  * Either a single `boolean`, or a non-empty tuple of `boolean`.
  */
export type Booleans = OneOrMany<boolean>
