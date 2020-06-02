import combineSlices from '@lib/redux/combineSlices'

import map from '@map/slice'
import settings from '@settings/settings'

const {
    actions: APP,
    reducer: ROOT_REDUCER
} = combineSlices({ map, settings })

export {
    APP as default,
    ROOT_REDUCER
}
