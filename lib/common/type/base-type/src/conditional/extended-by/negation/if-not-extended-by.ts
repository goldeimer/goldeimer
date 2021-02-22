import type { IfNotExtensionOf } from '../../extension-of'

/**
 * **Conditional By *Non-Assignability Of Another Type*.** \
 * Reverse direction variant of {@link IfExtensionOf|`IfExtensionOf`}.
 *
 * @remarks
 * This type is the *reverse direction* of `IfExtensionOf`. It is *not* the
 * *inverse* conditional. The *complementary conditional type*\* to the root
 * conditional `IfExtensionOf` is its negation,
 * {@link IfNotExtensionOf|`IfNotExtensionOf`}\*\*.
 *
 * \* On the term *complementary type*, as used in this context: To obtain the
 * set that actually fully qualifies as the "complement", as per text-book
 * definition, the actual test subject type (the argument to type parameter
 * `T`), would have to be excluded from one of the two sets, as this type (and
 * only this very exact type), is the intersection of the sets bounded by the
 * `extends` keyword from either direction relative to the type in the type
 * hierarchy.
 *
 * \*\* For the sake of completeness, the complement to this type would be
 * {@link IfNotExtendedBy|`IfNotExtendedBy`}, as is consistent with the
 * remainder of the nomenclature of conditional types.
 */
export type IfNotExtendedBy<
    Predicate,
    T,
    Then = T,
    Else = never
> = IfNotExtensionOf<T, Predicate, Then, Else>
