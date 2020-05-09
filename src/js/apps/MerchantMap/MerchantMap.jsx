import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { createStore } from 'redux'

import merchantMapReducer from 'reducers/MerchantMap/merchantMapReducer'

import ControlledInteractiveClusterMap from
    './containers/ControlledInteractiveClusterMap'
import MapControlUiLayer from
    './components/MapControlUiLayer/MapControlUiLayer'

const merchantMapStore = createStore(merchantMapReducer)

const MerchantMap = () => (
    <ReduxProvider store={merchantMapStore}>
        <ControlledInteractiveClusterMap />
        <MapControlUiLayer />
    </ReduxProvider>
)

export default MerchantMap
