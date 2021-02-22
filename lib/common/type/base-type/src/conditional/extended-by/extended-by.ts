import type { ExtendedByOr } from './extended-by-or'

/**
 * **Requires *Assignability of Another Type*.** \
 * Specialized variant of {@link IfExtendedBy|`IfExtendedBy`}.
 *
 * Resolves to unmodified given type `T` or to given `Else` type.
 */
export type ExtendedBy<
    Predicate,
    T
> = ExtendedByOr<Predicate, T, never>
