import type { Boolish, ExpressionOf } from '../../../boolean'

import type { IfNotSame } from './if-not-same'

/**
 * **Tests *Type-Level Equality*.** \
 * Specialized variant of {@link IfNotSame|`IfNotSame`}.
 *
 * Resolves to a `boolean` literal expression (i.e. `true` or `false`).
 */
export type IsNotSame<
    Predicate,
    T,
    TrueType extends Boolish = ExpressionOf<true>,
    FalseType extends Boolish = ExpressionOf<false>
> = IfNotSame<Predicate, T, TrueType, FalseType>
