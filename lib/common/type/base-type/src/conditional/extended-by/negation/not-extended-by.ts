import type { NotExtendedByOr } from './not-extended-by-or'

/**
 * **Requires *Non-Assignability Of Another Type*.** \
 * Specialized variant of {@link IfExtendedBy|`IfExtendedBy`}.
 *
 * Resolves to unmodified given type `T` or to given `Else` type.
 */
export type NotExtendedBy<
    Predicate,
    T
> = NotExtendedByOr<Predicate, T, never>
