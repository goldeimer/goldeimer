import { $enum } from 'ts-enum-util'

import type { Nullable } from '@goldeimer/ts-util'

import type { EnumInstance } from '../types'

export const getKey = <
    T,
    V extends Nullable<number>
>(
    enumObj: EnumInstance<T>,
    value: V,
): string => $enum(enumObj).getKeyOrDefault(
    value,
    'error_undefined_enum_value'
)
