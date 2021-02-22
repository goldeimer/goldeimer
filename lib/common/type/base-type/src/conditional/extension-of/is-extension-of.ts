import type { Boolish, ExpressionOf } from '../../boolean'

import type { IfExtensionOf } from './if-extension-of'

/**
 * **Tests *Assignability to Another Type*.** \
 * Specialized variant of {@link IfExtensionOf|`IfExtensionOf`}.
 *
 * Resolves to a `boolean` literal expression (i.e. `true` or `false`).
 */
export type IsExtensionOf<
    Predicate,
    T,
    TrueType extends Boolish = ExpressionOf<true>,
    FalseType extends Boolish = ExpressionOf<false>
> = IfExtensionOf<Predicate, T, TrueType, FalseType>
