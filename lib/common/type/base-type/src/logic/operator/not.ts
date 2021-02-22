import type { ExpressionOf, Falsiness, Falsy, Truthiness, Truthy } from '../../boolean'
import type { IsExtensionOf } from '../../conditional'

/**
 * **Logical Operation**
 */
export type Not<
    Operand extends Falsiness | Truthiness,
    TrueType extends Truthy = ExpressionOf<true>,
    FalseType extends Falsy = ExpressionOf<false>
> = IsExtensionOf<
    Falsiness,
    Operand,
    TrueType,
    FalseType
>
