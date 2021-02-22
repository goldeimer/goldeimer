import type { IfNotExtensionOf } from './if-not-extension-of'

/**
 * **Checks *Non-Assignability of Another Type with Fallback*.** \
 * Specialized variant of {@link IfNotExtensionOf|`IfNotExtensionOf`}.
 *
 * Resolves to unmodified given type `T` or to given `Else` type.
 */
export type NotExtensionOfOr<
    Predicate,
    T,
    Else
> = IfNotExtensionOf<Predicate, T, T, Else>
