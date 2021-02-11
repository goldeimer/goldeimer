import type { IsTrue } from '../conditional'

/**
 * Logical operation: All
 *
 * Evaluates to `true`, if all tuple elements do.
 *
 * @typeParam B - tuple of booleans
 */
export type All<B extends boolean[]> = IsTrue<[...B]>
