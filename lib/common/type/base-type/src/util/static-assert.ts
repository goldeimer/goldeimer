import type { Same } from '../conditional'

/**
 * **Simple Static Assertion** \
 * Checks code correctness at compile-time.
 *
 * Verifies an assumption about or requirement for a constant value type at
 * compile-time, rejects build on failure.
 */
export declare function staticAssertFalse<T extends false>(_value: T): void

/** {@inheritDoc staticAssertFalse} */
export declare function staticAssertTrue<T extends true>(_value: T): void

/** {@inheritDoc staticAssertFalse} */
export declare function staticAssertType<T extends unknown>(
    _type: Same<T, T>
): void
