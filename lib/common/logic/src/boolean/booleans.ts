import type { OneOrMany } from '../common'

import type { False, True } from './boolean-constant'

/**
 * One or many `false`s
 *
 * Either a single `false`, or a non-empty tuple of `false`.
 */
export type Falses = OneOrMany<False>

/**
 * One or many `true`s
 *
 * Either a single `true`, or a non-empty tuple of `true`.
 */
export type Trues = OneOrMany<True>

/**
 * One or many booleans
 *
 * Either a single boolean, or a non-empty tuple of booleans.
 */
export type Booleans = OneOrMany<boolean>
