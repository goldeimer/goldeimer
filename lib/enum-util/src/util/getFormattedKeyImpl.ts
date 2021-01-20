import {
    camelCase,
    lowerCase,
    pascalCase,
    sentenceCase,
    titleCase
} from '@goldeimer/js-util'

import { getFormattedKeyFunction } from './getFormattedKeyFunction'

export const getCamelCaseKey = getFormattedKeyFunction(camelCase)
export const getLowerCaseKey = getFormattedKeyFunction(lowerCase)
export const getPascalCaseKey = getFormattedKeyFunction(pascalCase)
export const getSentenceCaseKey = getFormattedKeyFunction(sentenceCase)
export const getTitleCaseKey = getFormattedKeyFunction(titleCase)
