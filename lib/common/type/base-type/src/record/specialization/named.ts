export type NameRecord<
    T extends unknown = unknown
> = Record<string | symbol, T>

export type NamedRecord<
    T extends unknown = unknown
> = NameRecord<T>

export type KeyedRecord<
    T extends unknown = unknown
> = NameRecord<T>

export type KeyRecord<
    T extends unknown = unknown
> = NameRecord<T>
