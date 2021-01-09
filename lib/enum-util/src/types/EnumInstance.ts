import type { StringKeyOf } from '@goldeimer/ts-util'

export type EnumInstance<T> = Record<
    StringKeyOf<T>,
    number
>
