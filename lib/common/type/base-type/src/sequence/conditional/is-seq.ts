import type { Boolish, ExpressionOf } from '../../boolean'

import type { IfSeq } from './if-seq'

export type IsSeq<
    T,
    TrueType extends Boolish = ExpressionOf<true>,
    FalseType extends Boolish = ExpressionOf<false>
> = IfSeq<T, TrueType, FalseType>
