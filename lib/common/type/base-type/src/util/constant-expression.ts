import type { At, Key } from '../record'
import type { SeqOrRec } from '../union'

export type ConstantExpression<
    Parameter extends SeqOrRec,
    Argument extends Key
> = At<Parameter, Argument>
