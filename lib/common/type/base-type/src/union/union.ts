import type { IfExtensionOf } from '../conditional'
import type { At, Index, Key } from '../record'
import type { Seq } from '../sequence'

import type { SeqOrRec } from './union-type'

export type Union<T extends SeqOrRec> = At<
    T,
    IfExtensionOf<
        Seq,
        T,
        Index,
        Key
    >
>
