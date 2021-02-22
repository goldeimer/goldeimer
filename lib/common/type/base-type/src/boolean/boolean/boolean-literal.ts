/**
 * **Literal Expression of `boolean`** \
 * `true` *xor* `false` type
 *
 * Resolves to either one of the possible literal types underlying the `boolean`
 * union of two complements, but not the union type itself.
 *
 * @remarks
 * A defined / initialized `boolean` symbol represents one of two distinctive
 * possible outcomes of some binary decision process. It holds either of the two
 * value types and ~~cannot~~ under usual circumstances does not undergo any
 * further mutations of state. The two values are mutually exclusive as well as
 * exhaustive. Hence the only (re-assignment of the respective other value type
 * is thinkable, but (a) is not a practice in this codebase (almost always
 * `const`, a `let` is a code smell), and (b) *should* be caught by static
 * typing. Willfully destructive illegitimate const- or type-assertions aside.
 *
 * An unspecialized `boolean` function or type parameter at compile-time is,
 * essentially, a form of ternary value. Namely, a "redundant binary representation".
 * The unknown state\* prior to assuming one of the two integral (and final)
 * states being the third value in this 3VL tuple.
 *
 * Here, as well as in the most common languages and scenarios, `boolean`, in the
 * context of the type system, is representative of both `true` and `false`
 * (c/f {@see {@link https://grahampriest.net/?ddownload=800|Graham Priest, "Logic Of Paradox Revisited", 1984, (pdf)}}), much more so than of neither, anyway.
 * Here, the intent is to require one of two literal values by explicitly
 * excluding their union, the undecided state. The two value types being
 * each other's absolute complement renders the task not as trivial as it may
 * at first glance appear (c/f {@see Stephen Cole Kleene, "Strong Logic Of Indeterminacy" in "Introduction to Mathematics", 1950},
 * {@see {@link https://homepages.uc.edu/~martinj/Papers/Classical%20Indetrminacy%20Many-Valued%20Logic%20&%20Supervaluations%20-%20IEEE.pdf|John Martin, "Classical Indetrminacy, Many-Valued Logic & Supervaluations", 1975 (pdf)}}).
 */
export type BooleanLiteral<
    B extends boolean = boolean
> = boolean extends B ? never : B
