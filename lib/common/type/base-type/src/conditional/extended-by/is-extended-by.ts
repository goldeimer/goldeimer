import type { ExpressionOf, Falsy, Truthy } from '../../boolean'

import type { IfExtendedBy } from './if-extended-by'

/**
 * **Conditional by *Assignability of Another Type*.** \
 * Specialized variant of {@link IfExtendedBy|`IfExtendedBy`}.
 *
 * Resolves to a `boolean` literal expression (i.e. `true` or `false`).
 */
export type IsExtendedBy<
    Predicate,
    T,
    TrueType extends Truthy = ExpressionOf<true>,
    FalseType extends Falsy = ExpressionOf<false>
> = IfExtendedBy<Predicate, T, TrueType, FalseType>
