import { combineReducers } from 'redux'

import error from 'reducers/map/errorReducer'
import features from 'reducers/map/featuresReducer'
import marker from 'reducers/map/markerReducer'
// import search from 'reducers/map/searchReducer'
import settings from 'reducers/map/settingsReducer'

export default combineReducers({
    error,
    features,
    marker,
    //    search,
    settings
})
