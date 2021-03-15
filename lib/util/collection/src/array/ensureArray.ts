import { Unpack } from './unpack'

import { Either, Has } from '@goldeimer/conditional'

export const ensureArray = <T>(val: T): Unpack<T>[] => {
    return Array.isArray(val) ? val : [val]
}

export type IsOrTo<> = ()

export default ensureArray
