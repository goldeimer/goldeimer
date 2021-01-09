import type { Nullable } from '@goldeimer/ts-util'

import type { EnumInstance } from '../types'

import { getKey } from './getKey'

interface StringTransformFn {
    (input: string): string
}

export const transformKey = (transformFn: StringTransformFn) => <
    T,
    V extends Nullable<number>,
>(
    enumObj: EnumInstance<T>,
    value: V,
): string => transformFn(
    getKey(
        enumObj,
        value
    )
)
