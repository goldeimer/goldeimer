import {
    camelCase,
    lowerCase
} from '@goldeimer/js-util'

import { transformKey } from './transformKey'

export const camelCaseKey = transformKey(camelCase)
export const lowerCaseKey = transformKey(lowerCase)
