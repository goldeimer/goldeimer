import type { Extends } from '../extends'

/**
 * Pass-Through or Alternative Type
 *
 * Leaves the subject type untouched, provided it extends the predicate type.
 * Otherwise resolves to provided alternative type.
 *
 * {@inheritDoc DOC.TYPE_PARAM.PASS_THROUGH.WITH_ELSE}
 */
export type ExtendsOr<
    T,
    PredicateT,
    ElseT
> = Extends<T, PredicateT, T, ElseT>

/** {@alias ExtendsOr} */
export type CheckedOr<
    T,
    PredicateT,
    ElseT
> = ExtendsOr<T, PredicateT, ElseT>

/** {@alias ExtendsOr} */
export type SimilarOr<
    T,
    PredicateT,
    ElseT
> = ExtendsOr<T, PredicateT, ElseT>
