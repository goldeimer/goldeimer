import type { Boolish, ExpressionOf } from '../../../boolean'

import type { IfNotSeq } from './if-not-seq'

export type IsNotSeq<
    T,
    TrueType extends Boolish = ExpressionOf<true>,
    FalseType extends Boolish = ExpressionOf<false>
> = IfNotSeq<T, TrueType, FalseType>
