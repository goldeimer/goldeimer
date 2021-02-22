import type { IfSeq } from './if-seq'

export type SeqOr<
    T,
    Else
> = IfSeq<T, T, Else>
