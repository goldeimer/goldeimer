import type { SeqOrRec } from '../../union'

/**
 * **(Noop) Mapped Type** \
 * Reduces a type's signature to non-built-in properties.
 *
 * Excludes property descriptors, prototype methods (`toString()` on `Number`,
 * for instance), and such, even if subsequent index access with a wide key
 * would otherwise have brought these forth as well. Regularly makes life
 * significantly easier than it otherwise would have been, despite its utterly
 * boring implementation.
 *
 * @remarks
 * This type is helpful for the following purposes:
 *  - Preliminary filtering / narrowing of key choices prior to applying further
 *    (actual) filtering of properties, to begin with a sane initial set.
 *  - Producing cleaner type hinting in the editor by eliminating transitive
 *    type information (the user of a type needs not to neccessarily know its
 *    intermediate composition).
 *  - Aiding along type inference, in place of a constrained identity function,
 *    which would pollute the runtime (yikes)\*.
 *
 * \* Enums for instance, though immensely helpful, already are adding some
 * significant runtime overhead (at least as long as `const` enums are outof the
 * question due to isolated modules being a requirement). Further leakage of
 * type-safety into the runtime should not be taken lightly.
 */
export type OwnProperties<
    T extends SeqOrRec
> = {
    [K in keyof T]: T[K]
}

/** {@alias OwnProperties} */
export type OwnProps<
    T extends SeqOrRec
> = OwnProperties<T>
