import type { IfSame } from './if-same'

/**
 * **Checks *Type-Level Equality* with Fallback.** \
 * Specialized variant of {@link IfSame|`IfSame`}.
 *
 * Resolves to unmodified given type `T` or to given `Else` type.
 */
export type SameOr<
    Predicate,
    T,
    Else
> = IfSame<Predicate, T, T, Else>
