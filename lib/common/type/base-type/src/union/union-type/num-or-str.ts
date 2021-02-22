/**
 * **Number or Its String Representation.** \
 * *Union Type* of a true `number` or its expression as a `string`.
 *
 * @typeParam T - `number` or numeric `string` (value type)
 *
 * @remarks
 * While it'd be legal (and uneventful) to pass a type as wide as `number` or
 * `string` itself, this type is really meant for literal expressions.
 */
export type NumberOrNumericString<N extends number = number> = N | `${N}`

export type NumOrNumStr<N extends number = number> = NumberOrNumericString<N>

export type NumberOrString<T extends number | string =  number | string> = T

export type NumOrStr<T extends number | string = number | string> = NumberOrString<T>
