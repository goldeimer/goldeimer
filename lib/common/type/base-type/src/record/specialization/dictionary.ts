export type StringRecord<
    T extends unknown = unknown
> = Record<string, T>

/** @alias */
export type StrRecord<
    T extends unknown = unknown
> = StringRecord<T>

/** @alias */
export type Dictionary<
    T extends unknown = unknown
> = StringRecord<T>

/** @alias */
export type Dict<
    T extends unknown = unknown
> = StringRecord<T>
