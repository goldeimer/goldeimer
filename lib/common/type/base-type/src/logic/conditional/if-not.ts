import type { Boolish, Truthy } from '../../boolean'
import type { IfExtensionOf } from '../../conditional'

/**
 * **Generic Conditional**
 *
 * Resolves to one of two given types, depending on whether
 * the supplied condition type is `false` or not.
 *
 * @typeParam Condition - type which must extend `typeof false` for `Then` to be resolved
 * @typeParam Then - type to resolve to on the condition type being `false`
 * @typeParam Else - type to resolve to on the condition type not being `false`
 */
export type IfNot<
    B extends Boolish,
    Then,
    Else = never
> = IfExtensionOf<Truthy, B, Else, Then>
