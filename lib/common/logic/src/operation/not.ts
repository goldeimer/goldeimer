import type { IsFalse } from '../conditional'

/**
 * Logical operation: Not
 *
 * Negates the type argument `T`.
 *
 * @typeParam T - boolean type to be negated
 */
export type Not<T extends boolean> = IsFalse<T>
