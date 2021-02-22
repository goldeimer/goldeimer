import type { ExpressionOf, Falsy, Truthy } from '../../../boolean'

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
    TrueType extends Truthy = ExpressionOf<true>,
    FalseType extends Falsy = ExpressionOf<false>
> = IfNotSame<Predicate, T, TrueType, FalseType>
