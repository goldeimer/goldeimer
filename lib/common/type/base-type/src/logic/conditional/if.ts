import type { Boolish, Truthy } from '../../boolean'
import type { IfExtensionOf } from '../../conditional'

/**
 * **Generic Conditional**
 *
 * Resolves to one of two given types, depending on whether
 * the supplied condition type is `true` or not.
 *
 * @typeParam Condition - type which must extend `typeof true` for `Then` to be resolved
 * @typeParam Then - type to resolve to on the condition type being `true`
 * @typeParam Else - type to resolve to on the condition type not being `true`
 */
export type If<
    B extends Boolish,
    Then,
    Else = never
> = IfExtensionOf<Truthy, B, Then, Else>
