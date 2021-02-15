import type { EmptySeqOf } from './empty-seq-of'

/**
 * **Sequence** `Seq`
 * Empty Array or Tuple
 *
 * Resolves to any empty sequence, a `0`-tuple or zero-length array.
 *
 * @remarks
 * TS will infer the type of an empty array of unspecified subtype as `never[]`,
 * which is why this type is not fit for declaring a value, but only suitable as
 * a constraint of a type parameter of some generic.\
 * If you're looking for a "type factory" to declare zero-length array
 * parameters that can hold actual values, refer to {@link EmptySeqOf}.
 *
 * @group seq
 * @empty
 */
export type EmptySeq = EmptySeqOf<unknown> // never[]
