/**
 * **Non-Empty Sequence** \
 * Non-empty tuple or array.
 *
 * Resolves any `N`-Tuple of type `T = unknown`, where `N > 0`.
 *
 * @group seq
 * @nonEmpty
 */
export type NonEmptySeq<T = unknown> = [T, ...T[]]
