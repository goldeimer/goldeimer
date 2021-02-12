import type { Extends } from '../extends'

/**
 * Boolean Type
 *
 * Resolves to `true` on condition of the two type parameters being of
 * (structurally) *exactly* the same type.
 */
export type TypeEq<
    A,
    B
> = Extends<
    A,
    B,
    Extends<B, A>
>
