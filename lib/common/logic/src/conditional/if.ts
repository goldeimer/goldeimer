import type { Booleans } from '../boolean'

import type { Extends } from './extends'
import type { IsFalse, IsTrue } from './is-boolean-constant'

/**
 * Conditional Type
 *
 * Resolves to one of two given types, depending on whether
 * the supplied condition type is `true`or not.
 *
 * @typeParam ConditionT - type which must extend `typeof true` for `ThenT` to be resolved
 * @typeParam ThenT - type to resolve to on the condition type being `true`
 * @typeParam ElseT - type to resolve to on the condition type not being `true`
 *
 * {@inheritDoc DOC.REMARKS.ELSE_T_NEVER}
 */
export type If<
    ConditionT extends Booleans,
    ThenT,
    ElseT = never
> = Extends<IsTrue<ConditionT>, true, ThenT, ElseT>

/**
 * Conditional Type
 *
 * Resolves to one of two given types, depending on whether
 * the supplied condition type is `false`or not.
 *
 * @typeParam ConditionT - type which must extend `typeof false` for `ThenT` to be resolved
 * @typeParam ThenT - type to resolve to on the condition type being `false`
 * @typeParam ElseT - type to resolve to on the condition type not being `false`
 *
 * {@inheritDoc DOC.REMARKS.ELSE_T_NEVER}
 */
export type IfNot<
    ConditionT extends Booleans,
    ThenT,
    ElseT = never
> = Extends<IsFalse<ConditionT>, true, ThenT, ElseT>
