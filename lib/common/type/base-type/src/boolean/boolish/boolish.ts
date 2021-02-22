import type { Falsy } from './falsy'
import type { Truthy } from './truthy'

/**
 * **Representations Of Either `true` or`false`** \
 * Set of values which may indicate either "falsi-" or "truthiness".
 *
 * *Union Type* of all value types interpretable as (and thus coercible to)
 * either `false` or `true`.
 *
 * @remarks
 * In the absence of further types, `boolean` is equivalent to the union of
 * `true` and `false`, indicating the unknown state, either in a place that must
 * handle both values, or in a step in the callchain, before the typed variable
 * (or constant or property) has assumed either concrete literal expression of
 * `boolean` as value type.
 *
 * Widening the value type may appear inconsistent to the entire theme of strong
 * typing and type-safety, has very little adverse effect in practice and comes
 * with a multitude of added benefits, however:
 *
 *  - The type *is* still strongly typed, resolves to a finite set of unique
 *    values, the two sets are mutually exclusive, and are the *absolute
 *    complement*\* of each other.
 *  - Prevention of unintended widening / coercion to the `boolean` base type
 *    is significantly simpler with a numeric integral constant and / or a union
 *    of multiple possible value types.
 *  - Javascript supports Object property keys of type `string`, `number`, or
 *    `symbol`. `boolean` cannot index properties, neither of class instance,
 *    nor a literal object, neither at runtime, not of a type at compile time.
 *    As such, not out of the ordinary and also irrelevant at runtime. Given how
 *    "constant expressions"\*\* can be achieved, conversion of a boolean result
 *    of some static, generically typed, transitive test type to an indexing
 *    (value) type is a regularly recurring need.
 *  - Related utility type(s)
 *
 * \* On the *absolute complement*: Mutually exclusive (no intersection),
 * as well as exhaustive (union set covers known set).
 * C/f. {@see {@link https://en.wikipedia.org/wiki/Complement_(set_theory)|Complement (set theory), wikipedia)}}.
 *
 * \*\* On *constant expressions*: You won't find direct mention thereof in
 * the official TS documentation (though it does contain all relevant pieces of
 * information).
 * C/f. {@see {@link https://github.com/Microsoft/TypeScript/issues/14833|"*Typescript's Type System is Turing Complete*", github issue #14833}}.
 */
export type Boolish = Falsy | Truthy
