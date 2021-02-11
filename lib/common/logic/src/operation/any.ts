import type { IsFalse } from '../conditional'

/**
 * Logical operation: Any
 *
 * Evaluates to `true`, if one (or more) tuple elements does.
 *
 * @typeParam B - tuple of booleans
 */
export type Any<B extends boolean[]> = IsFalse<IsFalse<B>>
