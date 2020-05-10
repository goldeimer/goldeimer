import { combineReducers } from 'redux'

import error from './errorReducer'
import featureCollection from './featureCollectionReducer'
import proximityMarker from './proximityMarkerReducer'
import settings from './settingsReducer'

export default combineReducers({
    error,
    featureCollection,
    proximityMarker,
    settings
})
