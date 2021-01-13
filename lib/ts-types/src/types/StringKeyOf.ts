// Extracts keys assignable to `string`
// (`keyof T` could be of `number` or `symbol` type).
export type StringKeyOf<T> = Extract<keyof T, string>
