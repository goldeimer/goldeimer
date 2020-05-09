import { combineReducers } from 'redux'

import proximityMarker from './proximityMarker'
import selectedFilterItems from './selectedFilterItems'

export default combineReducers({
    proximityMarker,
    selectedFilterItems
})
