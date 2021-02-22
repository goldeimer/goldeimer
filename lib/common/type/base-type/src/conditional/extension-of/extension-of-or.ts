import type { IfExtensionOf } from './if-extension-of'

/**
 * **Checks *Assignability To Another Type With Fallback*.** \
 * Specialized variant of {@link IfExtensionOf|`IfExtensionOf`}.
 *
 * Resolves to unmodified given type `T` or to given `Else` type.
 */
export type ExtensionOfOr<
    Predicate,
    T,
    Else
> = IfExtensionOf<Predicate, T, T, Else>
