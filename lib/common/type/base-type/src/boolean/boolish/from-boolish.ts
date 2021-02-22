import type { IfExtensionOf } from '../../conditional'

import type { Boolish } from './boolish'
import type { Falsy } from './falsy'
import type { Truthy } from './truthy'

export type FromBoolish<
    B extends Boolish,
    FalseExpression extends Falsy = false,
    TrueExpression extends Truthy = true
> = IfExtensionOf<
    Falsy,
    B,
    FalseExpression,
    IfExtensionOf<Truthy, B, TrueExpression>
>
