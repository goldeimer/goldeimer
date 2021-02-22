import type { SameOr } from './same-or'

/**
 * **Requires *Type-Level Equality*.** \
 * Specialized variant of {@link IfSame|`IfSame`}.
 *
 * Resolves to unmodified given type `T` or to `never`.
 */
export type Same<
    T,
    Predicate
> = SameOr<Predicate, T, never>
