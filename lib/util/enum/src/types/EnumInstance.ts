import type { StringKeyOf } from '@goldeimer/ts-types'

export type EnumInstance<EnumType> = Record<
    StringKeyOf<EnumType>,
    number
>
