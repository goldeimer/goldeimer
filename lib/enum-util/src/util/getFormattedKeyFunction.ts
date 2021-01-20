import type {
    IStringTransformFn
} from '@goldeimer/ts-types'

import type {
    EnumInstance
} from '../types'
import { getKey } from './getKey'

export const getFormattedKeyFunction = (
    transformFn: IStringTransformFn
): Function => <
    EnumType
>(
    enumObj: EnumInstance<EnumType>,
    value?: number | null,
): string => transformFn(
    getKey(
        enumObj,
        value
    )
)
