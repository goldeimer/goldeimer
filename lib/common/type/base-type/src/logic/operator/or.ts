import type { Boolish, ExpressionOf, Falsy,  Truthy } from '../../boolean'

import type { If } from '../conditional'

/**
 * **Logical Operation**
 *
 * Evaluates to `TrueType`, if either or both of the operand type arguments do,
 * to `FalseType` otherwise.
 */
export type Or<
    LhsOperand extends Boolish,
    RhsOperand extends Boolish,
    TrueType extends Truthy = ExpressionOf<true>,
    FalseType extends Falsy = ExpressionOf<false>
> = If<
    LhsOperand,
    TrueType,
    If<RhsOperand, TrueType, FalseType>
>
