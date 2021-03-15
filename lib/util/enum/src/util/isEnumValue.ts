import { $enum } from 'ts-enum-util'

import { camelCase } from '@goldeimer/string'

import { EnumInstance } from '../types'

// export type IsPropertyFns<T> = {
//     [P in keyof T as `is${Capitalize<string & T>}`]: (name: T) => T[P]
// }

export type IsEnumValueFns<E> = {
    [K in keyof E as `is${Capitalize<string & K>}`]: (value: E) => boolean
}

// isUmd
// getColor

enum A {
    a,
    b
}

export function isEnumValueFns<E>(enumObj: EnumInstance<E>) {
    return Object.fromEntries(
        $enum(enumObj).map((value, key) => [
            `is${camelCase(key)}`,
            (v: E) => v === value
        ])
    )
}
