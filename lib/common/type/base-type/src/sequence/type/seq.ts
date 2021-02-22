import type { PureSeq } from './pure-seq'

/**
 * **Sequence** \
 * Loosely Typed, Generic Array or Tuple
 *
 * - may hold any contents (as per default type argument, constrainable via the
 *   type parameter - value type is `T = unknown`)
 * - any size, (not constrainable\*)
 * - agnostic of mutability
 *
 * Resolves to an `Array` or `Tuple` holding members of type(s) assignable to
 * the provided type argument `T`.
 *
 * {@inheritDoc @goldeimer/doc-snippet!TypeParam.ValueType.Union#T}
 *
 * @remarks
 * {@inheritDoc @goldeimer/doc-snippet!Remarks.RestParam#SuitabilityImplied}
 *
 * \* Should you be wanting to declare a (small) fixed-length tuple
 * with the individual members each explicitly typed (and possibly named),
 * take a look at either {@link @goldeimer/base-type!Seq|`Seq<S>`} or at
 * {@link @goldeimer/callable!ParameterSeq|`ParameterSeq<P>`}, depending on the
 * use case. If you want an arbitrarily large, but fixed-length tuple instance
 * with typed members (optionally in recurring patterns), refer to
 * {@link @goldeimer/collection!TupleOf|`TupleOf<P>`}.
 *
 * @group Seq
 */
export type Seq<
    T extends unknown = unknown
> = (
    | T[]
    | readonly T[]
    | PureSeq<T>
)
