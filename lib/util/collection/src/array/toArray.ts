export type ToArray<T> = T extends any ? T[] : never

export type ToArrayNonDist<T> = [T] extends [any] ? T[] : never

export const toArray = <T>(val: T) => [val]
