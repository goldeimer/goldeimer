import { makeEnum } from '@lib/enum'

import defaultTheme from '@config/theme'

const { palette } = defaultTheme

const {
    enum: PUBLICATION_STATUS,
    keyToColorPairs,
    valueToColorPairs,
    valueToName
} = makeEnum([
    ['draft', null, palette.info.main],
    ['published', null, palette.success.main]
], 'PublicationStatus')

export {
    PUBLICATION_STATUS as default,
    keyToColorPairs,
    valueToColorPairs,
    valueToName
}
