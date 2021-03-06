import { And, Extends, If } from '@goldeimer/conditional'

export const isSafeInteger = (
    value: number
): boolean => Number.isSafeInteger(value)

export type EnableIf<
    Condition,
    Type
> = If<Condition, Type, never>

export type SafeInteger<Type> = EnableIf<
    And<
        Extends<Type, number>
    >,
    Type
>

export const isSafeMultiplication = (
    lhs: number,
    rhs: number
): boolean => isSafeInteger(lhs * rhs)

export type QuotientRemainderPair = [
    quotient: number,
    remainder: number
]

export const idivmod = (
    lhs: number,
    rhs: number
): QuotientRemainderPair => [
    lhs / rhs |0,
    lhs % rhs
]
