import type { If } from '../logic'
import type { Union } from '../union'

export type PrimitiveTypeSeq = [string, number, bigint, boolean, symbol]

export type NullishTypeSeq = [null, undefined]

export type PrimitiveTypeSeqWithNullish = [...PrimitiveTypeSeq, ...NullishTypeSeq]

export type Nullish = NullishTypeSeq[number]

export type Primitive<
    OptIncludeNullish extends boolean = false
> = Union<
    If<
        OptIncludeNullish,
        PrimitiveTypeSeqWithNullish,
        PrimitiveTypeSeq
    >
>
