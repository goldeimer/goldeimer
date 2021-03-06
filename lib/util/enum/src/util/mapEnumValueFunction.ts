import { $enum } from 'ts-enum-util'

import type {
    EnumMapper,
    UnderlyingEnumType
} from '../types'

export type MapEnumValueFunction<
    EnumType extends UnderlyingEnumType,
    MappedType
> = (
    value: EnumType
) => MappedType | undefined

export const mapEnumValueFunction = <
    EnumType extends UnderlyingEnumType,
    MappedType
>(
    mapper: EnumMapper<
        EnumType,
        MappedType
    >
): MapEnumValueFunction<EnumType, MappedType> => (value: EnumType): MappedType | undefined => (
    $enum.mapValue(value).with<MappedType>(mapper)
)
