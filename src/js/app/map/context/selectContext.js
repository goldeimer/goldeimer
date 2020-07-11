import { createSelector, createStructuredSelector } from 'reselect'

import { getFeatureById } from '@map/features'

import CONTEXT_TYPE from '@map/context/enumContextType'

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
        const additionalData = CONTEXT_TYPE.feature.is(type)
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
