import type { Boolish, ExpressionOf, Falsy,  Truthy } from '../../boolean'

import type { If, IfNot } from '../conditional'

/**
 * **Logical Operation: Exclusive Or**
 *
 * Evaluates to `TrueType`, if one and only one of either type arguments
 * `LhsOperand` or `RhsOperand` does (i.e. if one does *and* the other does
 * not), to `FalseType` otherwise.
 */
export type Xor<
    LhsOperand extends Boolish,
    RhsOperand extends Boolish,
    TrueType extends Truthy = ExpressionOf<true>,
    FalseType extends Falsy = ExpressionOf<false>
> = If<
    LhsOperand,
    IfNot<RhsOperand, TrueType, FalseType>,
    If<RhsOperand, TrueType, FalseType>
>
