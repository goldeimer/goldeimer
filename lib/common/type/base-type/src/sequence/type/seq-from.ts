import type { Seq } from './seq'

/**
 * **Sequence** \
 * Loosely Typed, Generic Array or Tuple
 *
 * - may hold any contents (as per default type argument - sequence type is
 *   `T = unknown[]`), constrainable via the type parameter
 * - may be of any size (not default constraint), constrainable by passing a
 *   tuple as the type argument
 * - agnostic of mutability
 *
 * {@inheritDoc @goldeimer/doc-snippet!TypeParam.Seq.ValueType.ArrayOrUnion#T}
 *
 * If the argument provided for the type parameter is itsself an array or tuple,
 * this type simply represents its type argument, as it was passed. Is the type
 * parametrized by some type not derived from `Array`, the argument type is
 * forwarded to {@link Seq|`Seq<T>`}.\
 *
 * @remarks
 * This is a *narrowing* type.\
 * It accepts any type as an argument to `T`, both arrays / tuples, as well as
 * non-array-like types (contrary to JS' `Array.from()`). A type not assignable
 * `Array` is treated as a value type (item type) and resolved to a sequence of
 * said type, while anything `Array`-ish is passed through unmodified, thus
 * guaranteeing a narrowed output for `T | T[]`-like input unions.
 *
 * Given this behavior, it is the ideal companion type for
 * {@link OneOrMany|`OneOrMany<T>`}, in the context typing a function signature,
 * where `OneOrMany<T>` is the (an) input parameter's type and `Seq<T>` the
 * function's return type (or along the lines thereof).
 *
 * {@inheritDoc @goldeimer/doc-snippet!Remarks.RestParam#SuitabilityImplied}
 *
 * @group seq
 * @narrowing
 */
export type SeqFrom<T> = T extends Seq ? T : Seq<T>
