import type { NotExtensionOfOr } from './not-extension-of-or'

/**
 * **Requires *Non-Assignability to Another Type*.** \
 * Specialized variant of {@link IfNotExtensionOf|`IfNotExtensionOf`}.
 *
 * Resolves to unmodified given type `T` or to given `Else` type.
 */
export type NotExtensionOf<
    Predicate,
    T
> = NotExtensionOfOr<Predicate, T, never>
