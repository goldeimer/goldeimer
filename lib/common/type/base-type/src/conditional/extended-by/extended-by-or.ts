import type { IfExtendedBy } from './if-extended-by'

/**
 * **Checks *Assignability of Another Type with Fallback*.** \
 * Specialized variant of {@link IfExtendedBy|`IfExtendedBy`}.
 *
 * Resolves to unmodified given type `T` or to given `Else` type.
 */
export type ExtendedByOr<
    Predicate,
    T,
    Else
> = IfExtendedBy<Predicate, T, T, Else>
