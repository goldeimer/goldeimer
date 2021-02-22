import type { Boolish, FromBoolish } from '../boolish'

export type ToBoolean<B extends Boolish> = FromBoolish<
    B,
    false,
    true
>
