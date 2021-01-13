import type { StringKeyOf } from '@goldeimer/ts-types'

export type EnumInstance<T> = Record<
    StringKeyOf<T>,
    number
>
