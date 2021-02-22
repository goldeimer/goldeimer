import type { IfExtensionOf } from '../extension-of'

/**
 * **Conditional by *Type-Level Equality*.** \
 * Specialized, bi-directional variant of {@link IfExtensionOf|`IfExtensionOf`}.
 *
 * Resolves to one of two given types (the tested type itself or `never`, by
 * default), depending on whether a subject type *is exactly the same type*\* as
 * a predicate type. Resolution types may be customized via optional type
 * parameters.
 *
 * @remarks
 * \* "exactly the same type" above refers to perfect *structural* congruence,
 * but yields neither an assertion of equal (or even related) origin of the
 * type, nor of reference equality at runtime. \
 * Also, note: The type does not
 * protect against improper type assertions. If the compiler believes them, an
 * additional type is not going to help correcting the issue before runtime.
 * (Just don't use type assertions. Write more fine-grained generics instead.)
 *
 * {@see {@link https://arxiv.org/abs/1309.2348|An Overview of Nominal-Typing versus Structural-Typing in OOP (arxiv)}}
 * {@see {@link https://wiki.c2.com/?NominativeAndStructuralTyping|Nominative And Structural Typing (wiki.c2)}}
 * {@see {@link https://en.wikipedia.org/wiki/Structural_type_system|Structural type system (wikipedia)}}
 */
export type IfSame<
    Predicate,
    T,
    Then = T,
    Else = never
> = IfExtensionOf<
    Predicate,
    T,
    IfExtensionOf<Predicate, T, Then, Else>,
    Else
>
