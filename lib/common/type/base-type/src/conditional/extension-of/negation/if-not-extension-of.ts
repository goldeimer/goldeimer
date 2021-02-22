import type { IfExtensionOf } from '../if-extension-of'

/**
 * **Conditional by *Non-Assignability to Another Type*.** \
 * Inverse variant of {@link IfExtensionOf|`IfExtensionOf`}.
 *
 * Resolves to one of two given types (the tested type itself or `never`, by
 * default), depending on whether a subject type *does not extend* the given
 * predicate type. Resolution types may be customized via optional type
 * parameters.
 */
export type IfNotExtensionOf<
    Predicate,
    T,
    Then = T,
    Else = never
> = IfExtensionOf<Predicate, T, Else, Then>
