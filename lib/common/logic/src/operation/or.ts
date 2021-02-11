import type { If, IsTrue } from '../conditional'

/**
 * Logical operation: Or
 *
 * Evaluates to `true`, if one of either type arguments `A` or `B` does.
 *
 * {@inheritDoc DOC.TYPE_PARAM.LOGICAL_OPERATION}
 */
export type Or<
    A extends boolean,
    B extends boolean
> = If<A, true, IsTrue<B>>
