import type { Boolish, ExpressionOf } from '../../boolean'

import type { IfSame } from './if-same'

/**
 * **Tests *Type-Level Equality*.** \
 * Specialized variant of {@link IfSame|`IfSame`}.
 *
 * Resolves to a `boolean` literal expression (i.e. `true` or `false`).
 */
export type IsSame<
    Predicate,
    T,
    TrueType extends Boolish = ExpressionOf<true>,
    FalseType extends Boolish = ExpressionOf<false>
> = IfSame<Predicate, T, TrueType, FalseType>
