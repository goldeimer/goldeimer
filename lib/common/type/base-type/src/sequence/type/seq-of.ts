/**
 * **Sequence** `Seq`\
 * Loosely-typed, Generic Array or Tuple
 *
 * - may hold any contents (as per default type argument - value type is `T =
 *   unknown`), constrainable via the type parameter
 * - any size, not constrainable<sup>1</sup>
 * - agnostic of mutability
 *
 * Resolves to `Array`s or `Tuple`s that hold member types assignable to the
 * provided type argument `T`.
 *
 * {@inheritDoc @goldeimer/doc-snippet!TypeParam.ValueType.Union#T}
 *
 * @remarks
 * {@inheritDoc @goldeimer/doc-snippet!Remarks.RestParam#SuitabilityImplied}
 *
 * <sup>1</sup> Should you be wanting to declare a (small) fixed-length tuple
 * with the individual members each explicitly typed (and possibly named),
 * take a look at either {@link @goldeimer/base-type!Seq|`Seq<S>`} or at
 * {@link @goldeimer/callable!ParameterSeq|`ParameterSeq<P>`}, depending on the
 * use case. If you want an arbitrarily large, but fixed-length tuple instance
 * with typed members (optionally in recurring patterns), refer to
 * {@link @goldeimer/collection!TupleOf|`TupleOf<P>`}.
 *
 * @group Seq
 */
export type SeqOf<T = unknown> = T[] | readonly T[]
