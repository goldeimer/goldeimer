

export type HasToString = { toString(): string }

export function toString<T extends (HasToString | string)>(value: T): string {
    return value.toString()
}
cch


export type OrConvertible<T, U> = T | Convertible<T, U>

export interface convert<T, U> {
    (value: T): U
}

export function convert<T, U>(value: T): U {
    return T as U
}

export const strToJsonObject = (value: string) => JSON.parse(value) as JsonObject

// export const toJsonObject<T> = T extends string ?
//     strToJsonObject(value) :

// // export const bufferToString = (buf: Buffer) => toString(buf)

export type ConvertibleFromBuffer = string | JsonObject
export interface bufferAs<T extends ConvertibleFromBuffer> {
    (buf: Buffer): Tch
}

export type toJsonObject<T> = (value: T) => JsonObject

export function toJsonObject<T>(value: T): JsonObject {

}

export type StringAs<T> = T extends string ? (arg: T) => T : T extends JsonObject ? toJsonObject : never

export const stringAs = <T>(str: string): T => <T extends(str)

export const bufferAs = <T>(buf: Buffer): T => stringAs<T>(toString(buf))



export const withType = <
    T,
    V = unknown
>(value: V) => value as V & T

export type GenericMethodName = 'get' | 'set'
export interface WithMethod<> {
    [`${M}`]: (...args: unknown[]) => void
}

type number1 = number & { __typename__: 'number1' }
class number2 {
    private readonly __typename__ = 'number2'
    private readonly _underlying

    constructor(underlying: number = 0) { this._underlying = underlying }

    // [Symbol.toPrimitive]() => this._underlying
    valueOf(): number { return this._underlying }

    static add(n1: number2, n2: number2): number2 {
        return new number2(n1.valueOf() + n2.valueOf())
    }

    static valueOf(wrapped: number2): number {
        return wrapped.valueOf();
    }
}

const make_number2 = (num: number) => new number2(num)

let number1_1: number1 = 1 as number1
let number1_2: number1 = 2 as number1
let number2_1: number2 = make_number2(1)
let number2_2: number2 = make_number2(2)

type number1_1_t = typeof number1_1
type number2_1_t = typeof number2_1

number1_1 = 2 as number1
number1_1 = number1_2
const number1_3 = number1_2
const number1_4: number1 = (number1_2 + number1_1) as number1

number2_1 = make_number2(3)
number2_1 = number2_2
const number2_3 = number2_2
const number2_4: number2 = make_number2((number2_2 + 2))

type number2_3_t = typeof number2_3
type number2_4_t = typeof number2_4

export const withMethod = <T = unknown>(_: T) => withType<WithMethod<'method'>, T>

export const jsonObj: JsonObject = {}

const a = withMethod(2)
const b = withMethod(jsonObj)