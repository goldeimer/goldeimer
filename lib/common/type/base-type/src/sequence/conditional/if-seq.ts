import type { IfExtensionOf } from '../../conditional'

import type { Seq } from '../type'

export type IfSeq<
    T,
    Then = T,
    Else = never
> = IfExtensionOf<Seq, T, Then, Else>
