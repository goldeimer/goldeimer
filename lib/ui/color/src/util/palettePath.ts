import { getLowerCaseKey } from '@goldeimer/enum-util'

import { PaletteKey } from '../enum'

export const palettePath = (
    value: PaletteKey
): string => `palette.${getLowerCaseKey(PaletteKey, value)}.main`
