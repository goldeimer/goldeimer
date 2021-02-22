import type { NotExtensionOf } from '../../conditional'
import type { SeqOrRec } from '../../union'

import type { Key } from '../specialization'

import type { OwnProps } from './own-properties'

type __At<
    T extends SeqOrRec,
    K extends Key = Key
> = (
    K extends keyof T
        ? OwnProps<T>[K]
    : string extends K
        ? T[keyof OwnProps<Omit<T, number | symbol>>]
    : number extends K
        ? T[keyof OwnProps<Omit<T, string | symbol>>]
    : symbol extends K
        ? T[keyof OwnProps<Omit<T, string | number>>]
    : K extends Key
        ? T[keyof OwnProps<T>]
    : never
)

export type At<
    T extends SeqOrRec,
    K extends Key = Key
> = NotExtensionOf<undefined, __At<T, K>>
