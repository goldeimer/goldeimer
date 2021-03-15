import type {
    EnumValueMapper,
    EnumValueMapperWithNull,
    EnumValueMapperWithNullAndUndefined,
    EnumValueMapperWithUndefined
} from 'ts-enum-util'

import type { UnderlyingEnumType } from './UnderlyingEnumType'

export type AnyEnumValueMapper<
    EnumType extends UnderlyingEnumType,
    MappedType = string
> = EnumValueMapper<EnumType, MappedType>
    | EnumValueMapperWithNull<EnumType, MappedType>
    | EnumValueMapperWithNullAndUndefined<EnumType, MappedType>
    | EnumValueMapperWithUndefined<EnumType, MappedType>

export type PartialEnumMapper<
    EnumType extends UnderlyingEnumType,
    MappedType = string
> = Partial<AnyEnumValueMapper<EnumType, MappedType>>

export type { AnyEnumValueMapper as EnumMapper }
