import type { NotSeqOr } from './not-seq-or'

export type NotSeq<T> = NotSeqOr<T, never>
