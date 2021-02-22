import type { IfNotSeq } from './if-not-seq'

export type NotSeqOr<
    T,
    Else
> = IfNotSeq<T, T, Else>
