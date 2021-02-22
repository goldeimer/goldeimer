import type { ExtensionOfOr } from './extension-of-or'

/**
 * **Requires *Assignability To Another Type*** \
 * Specialized variant of {@link IfExtensionOf|`IfExtensionOf`}.
 *
 * Resolves to unmodified given type `T` or to `never`.
 */
export type ExtensionOf<
    Predicate,
    T
> = ExtensionOfOr<Predicate, T, never>
