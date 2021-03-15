import { makeEnum } from '@goldeimer/js-util'

import defaultTheme from '@config/theme'

const { palette } = defaultTheme

const {
    enum: QueueItemStatus,
    keyToColorPairs,
    valueToColorPairs,
    valueToName
} = makeEnum([
    ['new', null, palette.warning.main],
    ['read', null, palette.info.main],
    ['handled', null, palette.success.main]
], 'QueueItemStatus')

export {
    QueueItemStatus as default,
    keyToColorPairs,
    valueToColorPairs,
    valueToName
}
