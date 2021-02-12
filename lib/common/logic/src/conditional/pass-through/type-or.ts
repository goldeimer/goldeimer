import type { If } from '../if'
import type { TypeEq } from '../eval/type-equality'

/**
 * Pass-Through or Alternative Type
 *
 * Leaves the subject type untouched, provided it [*is*]{@link TypeEq} the
 * predicate type. Otherwise resolves to provided alternative type.
 *
 * {@inheritDoc DOC.TYPE_PARAM.PASS_THROUGH.WITH_ELSE}
 */
export type TypeEqOr<
    T,
    PredicateT,
    ElseT
> = If<TypeEq<T, PredicateT>, T, ElseT>

export type StrictCheckedOr<
    T,
    PredicateT,
    ElseT
> = TypeEqOr<T, PredicateT, ElseT>

/** {@alias ExtendsOr} */
export type StrictSimilarOr<
    T,
    PredicateT,
    ElseT
> = TypeEqOr<T, PredicateT, ElseT>
