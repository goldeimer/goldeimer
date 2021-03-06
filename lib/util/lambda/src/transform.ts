import {
    Has
} from '@goldeimer/conditional'

// import { ToArrayNonDist } from '@goldeimer/collection'

type ToArrayNonDist<T> = [T] extends [any] ? T[] : never

type HasMapFn<T> = T extends { map: typeof Array.prototype.map } ? T : never

export type TransformFn<T extends ToArrayNonDist<T>, U> = (
    val: T | T[] | Iterable<T>
) => T extends
    ? U[]
    : U

const transformNumerics: TransformFn<number, number> = (val = 3) => val

export type Transform<F> = TransformFn<

const appendArrayToItself = <T>(values: T[]): (T | T[])[] => [
    ...values,
    values
]

const numericValues = [0, 1, 2, 3, 4]
const stringValues = ['a', 'b', 'c', 'd']

const nestedNumericValues = appendArrayToItself(numericValues)
const nestedStringValues = appendArrayToItself(stringValues)

const transformNumerics: TransformFn<number, number> = (val = 3) => val
const transformStrings: TransformFn<string, string> = (val = 'str') => '_' + val + '_'

nestedNumericValues.forEach((val) => transformNumerics(val))
nestedStringValues.forEach((val) => transformStrings(val))
