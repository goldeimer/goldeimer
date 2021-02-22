import type { IfNotSame } from './if-not-same'

/**
 * **Checks *Type-Level Equality* With Fallback.** \
 * Specialized variant of {@link IfNotSame|`IfNotSame`}.
 *
 * Resolves to unmodified given type `T` or to given `Else` type.
 */
export type NotSameOr<
    Predicate,
    T,
    Else
> = IfNotSame<Predicate, T, T, Else>
