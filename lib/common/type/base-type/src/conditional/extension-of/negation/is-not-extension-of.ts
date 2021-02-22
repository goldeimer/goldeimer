import type { ExpressionOf, Falsy, Truthy } from '../../../boolean'

import type { IfNotExtensionOf } from './if-not-extension-of'

/**
 * **Tests *Non-Assignability To Another Type*.** \
 * Specialized variant of {@link IfNotExtensionOf|`IfNotExtensionOf`}.
 *
 * Resolves to a `boolean` literal expression (i.e. `true` or `false`).
 */
export type IsNotExtensionOf<
    Predicate,
    T,
    TrueType extends Truthy = ExpressionOf<true>,
    FalseType extends Falsy = ExpressionOf<false>
> = IfNotExtensionOf<Predicate, T, TrueType, FalseType>
