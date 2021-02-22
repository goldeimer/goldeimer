import type { IfSeq } from '../if-seq'

export type IfNotSeq<
    T,
    Then = T,
    Else = never
> = IfSeq<T, Else, Then>
