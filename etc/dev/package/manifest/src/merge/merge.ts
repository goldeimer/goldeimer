import { merge as webpackMerge } from 'webpack-merge'

export const merge = <T extends object>(
    ...subjects: T | [T] | T[]
): T => webpackMerge(
    T extends Array ? subjects.shift() : subjects,
    ...subjects
)

export const merge = <T extends object>(
    ...subjects: T | [T] | T[]
): T => webpackMerge(
    T extends Array ? subjects.shift() : subjects,
    ...subjects
)
