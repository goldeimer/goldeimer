import type { NotSameOr } from './not-same-or'

/**
 * **Requires *Type-Level Equality*.** \
 * Specialized variant of {@link IfNotSame|`IfNotSame`}.
 *
 * Resolves to unmodified given type `T` or to `never`.
 */
export type NotSame<
    T,
    Predicate
> = NotSameOr<Predicate, T, never>
