import map from 'slices/map'
import settings from 'slices/settings'
import combineSlices from 'utilities/redux/combineSlices'

const { actions, reducer } = combineSlices({ map, settings })

export {
    actions as default,
    reducer
}
