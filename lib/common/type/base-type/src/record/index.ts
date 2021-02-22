import type { Key } from './specialization'

export type RecordOf<T extends unknown> = Record<Key, T>

export type AnyRecord = RecordOf<unknown>

export * from './specialization'
export * from './util'
