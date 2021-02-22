import type { ExpressionOf, Falsy, Truthy } from '../../../boolean'

import type { IfNotExtendedBy } from './if-not-extended-by'

/**
 * **Conditional By *Assignability Of Another Type*.** \
 * Specialized variant of {@link IfNotExtendedBy|`IfNotExtendedBy`}.
 *
 * Resolves to a `boolean` literal expression (i.e. `true` or `false`).
 */
export type IsNotExtendedBy<
    Predicate,
    T,
    TrueType extends Truthy = ExpressionOf<true>,
    FalseType extends Falsy = ExpressionOf<false>
> = IfNotExtendedBy<Predicate, T, TrueType, FalseType>
