import type { IsTrue } from '../conditional'

/**
 * Logical operation: And
 *
 * Evaluates to `true`, if both type arguments `A` and `B` do.
 *
 * {@inheritDoc DOC.TYPE_PARAM.LOGICAL_OPERATION}
 */
export type And<
    A extends boolean,
    B extends boolean
> = IsTrue<[A, B]>
