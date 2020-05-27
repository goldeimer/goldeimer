import { combineReducers } from 'redux'

import error from './errorReducer'
import features from './featuresReducer'
import marker from './markerReducer'
// import search from './searchReducer'
import settings from './settingsReducer'

export default combineReducers({
    error,
    features,
    marker,
    //    search,
    settings
})
