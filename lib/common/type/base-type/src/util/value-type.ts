import type { At, Key } from '../record'
import type { Union, SeqOrRec } from '../union'

export type ValueType<
    T extends SeqOrRec,
    K extends Key | unknown = unknown
> = (
    unknown extends K
        ? Union<SeqOrRec>
    : At<T, K & KeyType>
)
