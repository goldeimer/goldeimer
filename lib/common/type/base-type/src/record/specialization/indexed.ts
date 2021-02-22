export type NumericRecord<
    T extends unknown = unknown
> = Record<number, T>

/** @alias */
export type NumRecord<
    T extends unknown = unknown
> = NumericRecord<T>

/** @alias */
export type IndexRecord<
    T extends unknown = unknown
> = NumericRecord<T>

/** @alias */
export type Indexed<
    T extends unknown = unknown
> = NumericRecord<T>
