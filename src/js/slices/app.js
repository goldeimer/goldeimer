import map from 'slices/map/map'
import settings from 'slices/settings'
import combineSlices from 'util/redux/combineSlices'

const { actions, reducer } = combineSlices({ map, settings })

export {
    actions as default,
    reducer
}
