import type { Extends } from './extends'

/**
 * Conditional Type
 *
 * Resolves to one of two given types, depending on whether
 * the supplied condition type is `true`or not.
 *
 * @typeParam ConditionT - type which must extend `typeof true` for `ThenT` to be resolved
 *
 * {@inheritDoc DOC.TYPE_PARAM.ELSE_T_REMARKS}
 */
export type TypeEq<
    A,
    B
> = Extends<
    A,
    B,
    Extends<B, A>
>
