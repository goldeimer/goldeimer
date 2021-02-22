import type { Boolish } from './boolish'
import type { Falsy } from './falsy'
import type { FromBoolish } from './from-boolish'
import type { Truthy } from './truthy'

export type ToBoolish<
    B extends Boolish
> = FromBoolish<
    B,
    Falsy,
    Truthy
>
