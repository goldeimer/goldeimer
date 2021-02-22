import type { IfNotExtensionOf } from '../../extension-of'

/**
 * **Conditional By *Type-Level Equality*.** \
 * Inverse variant of {@link IfSame|`IfSame`}.
 *
 * Resolves to one of two given types (the tested type itself or `never`, by
 * default), depending on whether a subject type *is not exactly the same
 * type* as a given predicate type.
 */
export type IfNotSame<
    Predicate,
    T,
    Then = T,
    Else = never
> = IfNotExtensionOf<
    Predicate,
    T,
    IfNotExtensionOf<T, Predicate, Then, Else>,
    Else
>
