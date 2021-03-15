import { makeEnum } from '@goldeimer/js-util'

import defaultTheme from '@config/theme'

const { palette } = defaultTheme

const {
    enum: PublicationStatus,
    keyToColorPairs,
    valueToColorPairs,
    valueToName
} = makeEnum([
    ['draft', null, palette.info.main],
    ['published', null, palette.success.main]
], 'PublicationStatus')

export {
    PublicationStatus as default,
    keyToColorPairs,
    valueToColorPairs,
    valueToName
}
