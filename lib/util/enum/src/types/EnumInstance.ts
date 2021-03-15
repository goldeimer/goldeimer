import type { StringKeyOf } from '@goldeimer/ts-types'

export type EnumInstance<E> = Record<
    StringKeyOf<E>,
    number
>
