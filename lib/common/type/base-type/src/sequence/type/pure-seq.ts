import type { NumericRecord } from '../../record'

/**
 * **Pure Sequence** \
 * Absolute Minimal Description of a Tuple or Array
 *
 * Describes the most essential nature of an array: A numeric index and a
 * `length` property holding a number.
 *
 * @remarks
 * Does *not* imply sufficiently verified correctness for safe unchecked
 * iteration attempts at runtime, as the type would resolve
 * `{ 2: T, length: 99 }` without complaint, for instance.
 */
export type PureSeq<
    T extends unknown = unknown
> = NumericRecord<T> & { length: number }
