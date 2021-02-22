import type { Boolish, ExpressionOf } from '../../../boolean'

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
    TrueType extends Boolish = ExpressionOf<true>,
    FalseType extends Boolish = ExpressionOf<false>
> = IfNotExtensionOf<Predicate, T, TrueType, FalseType>
