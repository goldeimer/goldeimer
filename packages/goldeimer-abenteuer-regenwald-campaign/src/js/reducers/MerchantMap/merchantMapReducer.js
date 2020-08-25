import { combineReducers } from 'redux'

import error from './errorReducer'
import featureCollection from './featureCollectionReducer'
import marker from './markerReducer'
import settings from './settingsReducer'

export default combineReducers({
    error,
    featureCollection,
    marker,
    settings
})
