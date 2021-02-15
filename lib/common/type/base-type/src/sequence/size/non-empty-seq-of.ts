/**
 * **Sequence** `Seq`
 * Generic, Non-empty Tuple or Array
 *
 * `N`-Tuple of type `T = unknown`, where `N > 0`
 *
 * {@inheritDoc @goldeimer/doc-snippet!Remarks.RestParam#SuitabilityImplied}
 *
 * @group seq
 * @nonEmpty
 */
export type NonEmptySeqOf<T = unknown> = [T, ...T[]]
