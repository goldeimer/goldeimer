import type { Boolish, FromBoolish } from '../boolish'

import type { FalseLikeString, TrueLikeString } from './boolean-like-value'

export type ToString<
    B extends Boolish
> = FromBoolish<
    B,
    FalseLikeString,
    TrueLikeString
>
