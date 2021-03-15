import { tryCatch, Either, Left, Right, isLeft, isRight } from '@typed/either'
import { is, or, isNull, isUndefined, isNotArray, isNotArrayLike, isArrayLike, toJson } from '@typed/logic'
import type { Is, Predicate } from '@typed/lambda'
import type { IO, JsonObject } from '@typed/common'

// import OrError = Either
// export { OrError }

// export type ConversionFn<I, O> = (value: I) => (O)

// export const convert<V, T>: ConversionFn =

// export const to = <T>(value: unknown): T extends unknown[] ? [value] : value

// export const orTo = <T, U extends T>(
//     value: T,
//     predicate: Is<U>
// ) => predicate(value) ? value : to<U>(value)

export const array = <T>(value: T) => isNotArray(value) ? [value] : value
export const arrayLike = <T>(value: T) => isNotArrayLike(value) ? [value] : value

export class BaseError extends Error {}

// export class ValueError extends BaseError {}
// export class ParseError extends ValueError {}

export type Nullish = null | undefined
export type Nullable<T> = T | Nullish
export type NotNullable<T> = Exclude<T, Nullish>
export const isNullish: Is<Nullish> = or(isUndefined, isNull)

export const errorIf = <T>(
    value: T,
    predicate: Predicate<T>
): Either<Error, T> => predicate(value)
    ? Either.left(new BaseError())
    : Either.of(value)

export const errorIfNullish = <T>(value: T) => errorIf(value, isNullish)

export type ValueOrError<T, E extends Error = Error> = Either<E, T>

export const isError = <T, E extends Error = Error>(either: ValueOrError<T, E>): either is Left<E> => isLeft(either)
export const isSuccess = <T, E extends Error = Error>(either: ValueOrError<T, E>): either is Right<T> => isRight(either)

export const toString = ({
    allow: [typeof null]
})

export type WithDefault<T, Default extends T> = T extends Nullish ? Default : T

export const catchError = <E extends Error = Error, T = unknown>(fn: IO<T>) => tryCatch<T, E>(fn)

export interface parseAs<T, V = unknown> {
    (value: V): Either<BaseError, T>
}
