import type { Boolish, ExpressionOf, Falsy, Truthy } from '../../boolean'
import type { IsExtensionOf } from '../../conditional'

/**
 * **Logical Operation**
 *
 * Evaluates to `TrueType`, if the operand type argument extends `Truthy`,
 * to `FalseType` otherwise.
 */
export type IsFalsy<
    Operand extends Boolish,
    TrueType extends Truthy = ExpressionOf<true>,
    FalseType extends Falsy = ExpressionOf<false>
> = IsExtensionOf<
    Falsy,
    Operand,
    TrueType,
    FalseType
>
