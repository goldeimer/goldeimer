import { makeEnum } from '@goldeimer/js-util'

import defaultTheme from '@config/theme'

const { palette } = defaultTheme

const {
    enum: GEOCODING_STATUS,
    keyToColorPairs,
    valueToColorPairs,
    valueToName
} = makeEnum([
    ['notAttempted', 'not attempted', palette.warning.main],
    ['failed', null, palette.error.main],
    ['found', null, palette.success.main],
    ['outdated', null, palette.warning.main]
], 'GeocodingStatus')

export {
    GEOCODING_STATUS as default,
    keyToColorPairs,
    valueToColorPairs,
    valueToName
}
