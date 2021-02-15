import { AnySeq } from './any-seq'

/**
 * **Sequence** `Seq`\
 * Generic Array or Tuple (Alias) Type
 *
 * - may hold any contents (as per default type argument - sequence type is
 *   `T = unknown[]`), constrainable via the type parameter
 * - may be of any size (not default constraint), constrainable by passing a tuple as the
 *   type argument
 * - agnostic of mutability
 *
 * This type is *not* generative. It is an alias type and of representative
 * nature, in so far as its type parameter is constrained to an `Array`-Type and
 * a specialization of `Seq` *is* the argument type itsself.
 *
 * {@inheritDoc @goldeimer/doc-snippet!TypeParam.Seq.ValueType.Array#T}
 *
 * @remarks
 * The recurring use-case is to expressively constrain the type parameters of
 * other generics to some array-like data structure.
 *
 * @example
 * ```typescript
 * type DerivedExplicit<T extends Seq<[named: string, number, boolean?]> = // ...
 * type DerivedGeneric<T extends Seq<string[]> = // ...
 * type DerivedVariadic<T extends Seq<[named: string, number, ...number]> = // ...
 * ```
 *
 * All of the above could just as well have been typed in exactly the same
 * fashion without the `Seq<...>` wrapper. Really, if at all, by itself the type
 * is only useful for better communication of intent amongst developers. As far
 * as TS is concerned, it's merely a common tuple and for the interpreting
 * engine at runtime, it's a common `Array` instance.
 *
 * @privateRemarks
 * Primarily, `SeqType` fills what would otherwise be a gap in the type
 * hierarchy of list-like `<DescriptiveName>Seq` types.
 *
 * Maybe it's entirely superfluous.\
 * It *feels* that way.\
 * Primarily depends on whether the usage in {@link Seq|`Seq<T>`} is actually
 * sensible. It *looks* redundant, but it *might* actually provide additional
 * narrowing in some cases, that would be a headache to achieve in-place at the
 * callsite. Testing is needed to make an informed decision whether to remove.
 *
 * {@inheritDoc @goldeimer/doc-snippet!Remarks.RestParam#SuitabilityImplied}
 */
export type SeqType<S = AnySeq> = S extends AnySeq ? S : never
