import { makeEnum } from '@lib/enum'

import defaultTheme from '@config/theme'

const { palette } = defaultTheme

const {
    enum: QUEUE_ITEM_STATUS,
    keyToColorPairs,
    valueToColorPairs,
    valueToName
} = makeEnum([
    ['new', null, palette.warning.main],
    ['read', null, palette.info.main],
    ['handled', null, palette.success.main]
], 'QueueItemStatus')

export {
    QUEUE_ITEM_STATUS as default,
    keyToColorPairs,
    valueToColorPairs,
    valueToName
}
