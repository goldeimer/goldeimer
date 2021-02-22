import type { Boolish, ExpressionOf, Falsy, Truthy } from '../../boolean'

import type { All } from './all'

/**
 * **Logical Operation**
 *
 * Evaluates to `TrueType`, if both arguments to type parameters `LhsOperand`
 * and `RhsOperand` do, to `FalseType` otherwise.
 */
export type And<
    LhsOperand extends Boolish,
    RhsOperand extends Boolish,
    TrueType extends Truthy = ExpressionOf<true>,
    FalseType extends Falsy = ExpressionOf<false>
> = All<
    [LhsOperand, RhsOperand],
    TrueType,
    FalseType
>
