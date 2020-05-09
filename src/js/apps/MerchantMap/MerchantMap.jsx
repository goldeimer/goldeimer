import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import merchantMapReducer from 'reducers/MerchantMap/merchantMapReducer'

import ControlledInteractiveClusterMap from
    './containers/ControlledInteractiveClusterMap'
import MapControlUiLayer from
    './components/MapControlUiLayer/MapControlUiLayer'

const loggerMiddleware = createLogger()

const merchantMapStore = createStore(
    merchantMapReducer,
    applyMiddleware(
        loggerMiddleware,
        thunkMiddleware
    )
)

const MerchantMap = () => (
    <ReduxProvider store={merchantMapStore}>
        <ControlledInteractiveClusterMap />
        <MapControlUiLayer />
    </ReduxProvider>
)

export default MerchantMap
