import type { Extends } from '../extends'
import type { If } from '../if'
import type { TypeEq } from '../eval/type-equality'

/**
 * Pass-Through or `never`
 *
 * Leaves the subject type untouched, provided it extends the predicate type.
 * Otherwise resolves to `never`.
 *
 * {@inheritDoc DOC.TYPE_PARAM.PASS_THROUGH.BASE}
 */
export type Checked<
    T,
    PredicateT
> = If<Extends<T, PredicateT>, T>

/**
 * Pass-Through or `never`
 *
 * Leaves the subject type untouched, provided it [*is*]{@link TypeEq} the
 * predicate type. Otherwise resolves to `never`.
 *
 * {@inheritDoc DOC.TYPE_PARAM.PASS_THROUGH.BASE}
 */
export type StrictChecked<
    T,
    PredicateT
> = If<TypeEq<T, PredicateT>, T>
