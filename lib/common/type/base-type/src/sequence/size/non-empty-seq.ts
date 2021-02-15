import type { SeqType } from '../type'
import type { NonEmptySeqOf } from './non-empty-seq-of'


/**
 * **Sequence** `Seq`
 * Unconstrained Non-empty Tuple or Array
 *
 * `N`-Tuple of `unknown` type, where `N > 0`
 *
 * {@inheritDoc @goldeimer/doc-snippet!Remarks.RestParam#SuitabilityImplied}
 *
 * @group seq
 * @narrowing
 * @nonEmpty
 */
export type NonEmptySeq<T> = (
    T extends SeqType ? (
        T extends NonEmptySeqOf<any>
            ? T
        : never
    ) : NonEmptySeqOf<T>
)
