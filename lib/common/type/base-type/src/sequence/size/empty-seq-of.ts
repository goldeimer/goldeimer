import type { NonEmptySeqOf } from './non-empty-seq-of'

/**
 * **Sequence** `Seq`
 * Generic, Empty Array or Tuple
 *
 * Resolves to any empty sequence, a `0`-tuple or empty array.
 *
 * {@inheritDoc @goldeimer/doc-snippet!TypeParam.ValueType.Union#T}
 *
 * {@inheritDoc @goldeimer/doc-snippet!Remarks.RestParam#SuitabilityImplied}
 *
 * @group seq
 * @empty
 */
export type EmptySeqOf<T = unknown> = (
    T extends NonEmptySeqOf<T>
        ? never
    : T[]
)
