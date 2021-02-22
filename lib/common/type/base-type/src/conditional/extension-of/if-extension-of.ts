/**
 * **Conditional By *Assignability To Another Type*.** \
 * *Root of all conditions*: Wraps the `extends` keyword.
 *
 * Resolves to one of two given types (the tested type itself or `never`, by
 * default), depending on whether a subject type *extends* a predicate type.
 * Resolution types may be customized via optional type parameters.
 *
 * The behavior of the `extends` keyword is deterministic and follows stringent
 * logic, unfortunately however, it is not quite as intuitive as it is correct.
 * It guarantees assignability, but it does not always straightforwardly reflect
 * the nature of the relationship actually needing testing. Depending on the
 * situation, one of the related types {@link IfSame} or {@link IfExtendedBy}
 * may be a better fit.
 *
 * @typeParam Predicate - the type which type `T` must extend for `Then` to be resolved
 * @typeParam T - subject of the test, i.e. the argument type that must extend `Predicate` for `Then` to be resolved
 * @typeParam Then - resolution type for the case of the condition having been met
 * @typeParam Else - resolution type for the case of the condition not having held
 *
 * @remarks
 * Utility type to facilitate improved readability in more complex types further
 * down the line. Simply, `T extends Predicate ? Then : Else` wrapped in a
 * type, with `Then` defaulting to `T` and `Else` to `never`.
 *
 * **On the behavior of `extends`:**
 *
 * **Literal primitives**
 *
 * Assignability implies *equality or a subset*.
 *
 * ```
 * 'string' extends string   = true
 * string   extends string   = true
 * string   extends 'string' = false
 * 1910     extends number   = true
 * number   extends number   = true
 * number   extends 1910     = false
 * true     extends boolean  = true
 * boolean  extends boolean  = true
 * boolean  extends true     = false
 * ```
 *
 * **`Class` with inheritance**
 *
 * Assignability implies *equality or a superset*.
 *
 * A superset of information  - properties and/or methods, anyway - the number
 * of instances at runtime would likely be a subset.
 *
 * @todo Johannes - Add tests for CRTP / f-bound polymorphism.
 *
 * ```
 * Derived extends Base    = true
 * Base    extends Base    = true
 * Base    extends Derived = false
 * ```
 *
 * **`Object` literal**
 *
 * Assignability implies *equality or a superset* of required properties.
 *
 * Optional properties are irrelevant, both on the left-hand- and
 * right-hand-side operand.
 *
 * ```
 * {a: string, b: number} extends {a: string}             = true
 * {a: string}            extends {a: string, b: number}  = false
 * {a: string}            extends {a: string, b?: number} = true
 * ```
 *
 * **Tuple (`Array` literal)**
 *
 * Assignability implies *near-equality, with numerous edge cases*.
 *
 * Required properties must match exactly, with the exception of the
 * right-hand-side operand being allowed to collect the left's required
 * parameters via an optional or a rest parameter. But, contrary to in the case
 * of object references, must collect all of them. For it to collect the
 * left's optional ones via a rest parameter as well, the right would have to do
 * so in an array of unions with `undefined`.\
 * The left-hand-side operand may exclude the optional parameters of the right,
 * but may not end in a rest parameter, unless the right-hand-side does as
 * well.\
 * Finally, tuples extend unbounded arrays, but not the other way around,
 * unsurprisingly so.
 *
 * ```
 * [string, number]         extends [string]              = false
 * [string]                 extends [string, number]      = false
 * [string]                 extends [string, number?]     = true
 * [string, number]         extends [string, number?]     = true
 * [string, number?]        extends [string, number]      = false
 * [string, number?]        extends [string]              = false
 * [string]                 extends [string, ...number[]] = true
 * [string, ...number[]]    extends [string]              = false
 * [string, ...number[]]    extends [string, number]      = false
 * [string, number]         extends [string, ...number[]] = true
 * [string, number, number] extends [string, ...number[]] = true
 * [string]                 extends string[]              = true
 * string[]                 extends [string]              = false
 * [[string]]               extends string[][]            = true
 * string[][]               extends [[string]]            = false
 * ```
 *
 * @privateRemarks
 * After much (excessive?) deliberation, this type was chosen to not be named
 * `Extends`, despite the obvious conformance with the underlying keyword that
 * choice of name would have had. The nomenclature of the keyword itself is
 * debatable, albeit certainly not bad, however especially as a wrapped generic,
 * `Extends` is ambiguous.\
 * `IsDoing` distinctively implies resolving to a `boolean` value type.
 * `IfDoing` nearly as unambiguously implies conditional type resolution (a "then"
 * type for the success case) and possibly branching (an "else" type,
 * a resolution for the non-success case). `DoingOr` does a decent enough job at
 * communicating a type-check with a default value type (an "else").
 * `Doing<T>` might not as clearly imply resolving to `T` or `never`, but is
 * maximally consistent with its `If...`,  `Is...`, and `...Or` affixed
 * siblings and thus indicative of some semantic relationship with them, while equally
 * indicative of representing a different condition with a unique type
 * resolution.\
 * (Contrast that to `Does<T>`. That name yields ambiguity of a considerably
 * higher degree.)
 */
export type IfExtensionOf<
    Predicate,
    T,
    Then = T,
    Else = never
> = T extends Predicate ? Then : Else
