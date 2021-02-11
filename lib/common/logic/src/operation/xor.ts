import type { If, IsFalse, IsTrue } from '../conditional'

/**
 * Logical operation: Exclusive or
 *
 * Evaluates to `true`, if one and only one of either type arguments `A` or `B`
 * does, i.e. if one does *and* the other does not.
 *
 * {@inheritDoc DOC.TYPE_PARAM.LOGICAL_OPERATION}
 */
export type Xor<
    A extends boolean,
    B extends boolean
> = If<A, IsFalse<B>, IsTrue<B>>
