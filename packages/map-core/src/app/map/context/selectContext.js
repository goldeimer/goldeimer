import { createSelector, createStructuredSelector } from 'reselect'

import { ContextType } from '../enum'
import { getFeatureById } from '../feature'

const selectContextId = (state) => state.map.context.id
const selectContextLatitude = (state) => state.map.context.latitude
const selectContextLongitude = (state) => state.map.context.longitude
const selectContextPlaceName = (state) => state.map.context.placeName
const selectContextType = (state) => state.map.context.type

const selectContextState = createStructuredSelector({
    id: selectContextId,
    latitude: selectContextLatitude,
    longitude: selectContextLongitude,
    placeName: selectContextPlaceName,
    type: selectContextType
})

const selectContext = createSelector(
    selectContextState,
    ({ id, type, ...context }) => {
        const additionalData = type === ContextType.FEATURE
            ? getFeatureById(id)
            : {}

        return {
            id,
            type,
            ...context,
            ...additionalData
        }
    }
)

export default selectContext
