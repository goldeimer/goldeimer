import type { Boolishness, ExpressionOf, Falsy, Truthiness, Truthy } from '../../boolean'
import type { IsExtensionOf } from '../../conditional'

/**
 * **Logical Operation**
 *
 * Evaluates to `TrueType`, if all tuple elements do, to `FalseType` otherwise.
 */
export type All<
    Operand extends Boolishness,
    TrueType extends Truthy = ExpressionOf<true>,
    FalseType extends Falsy = ExpressionOf<false>
> = IsExtensionOf<
    Truthiness,
    Operand,
    TrueType,
    FalseType
>
