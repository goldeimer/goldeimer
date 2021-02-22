import type { Boolish, FromBoolish } from '../boolish'

import type { FalseLikeNumber, TrueLikeNumber } from './boolean-like-value'

export type ToNumber<
    B extends Boolish
> = FromBoolish<
    B,
    FalseLikeNumber,
    TrueLikeNumber
>
