import { lowerCaseKey } from '@goldeimer/enum-util'

import { PaletteKey } from '../enum'

export const palettePath = (
    value: PaletteKey
): string => `palette.${lowerCaseKey(PaletteKey, value)}.main`
