import type { IfNotExtendedBy } from './if-not-extended-by'

/**
 * **Checks *Non-Assignability Of Another Type With Fallback*.** \
 * Specialized variant of {@link IfNotExtendedBy|`IfNotExtendedBy`}.
 *
 * Resolves to unmodified given type `T` or to given `Else` type.
 */
export type NotExtendedByOr<
    Predicate,
    T,
    Else
> = IfNotExtendedBy<Predicate, T, T, Else>
