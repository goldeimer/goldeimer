import {
    $enum,
    EnumValue,
    EnumValueMapper
} from '@goldeimer/enum-util'

import type {
    Nullable,
} from '@goldeimer/ts-util'

import type {
    PaletteKey
} from '../enum'

import {
    palettePath
} from './palettePath'

export const enum2ColorPalettePath = <
    T,
    V extends Nullable<number>
>(
    mapper: EnumValueMapper<Extract<keyof T, V>, PaletteKey>
): Function => (
    value: EnumValue<T, V>
): string => palettePath(
    $enum.mapValue(value).with(mapper)
)
