import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Provider as ReduxProvider, useDispatch } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import { fetchFeatureCollection } from 'actions/merchantMapActions'

import { ThemeProvider } from '@material-ui/core/styles'

import getTheme from 'config/theme'
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

const theme = getTheme()

const ComponentRoot = () => {
    const dispatch = useDispatch()

    useEffect(
        () => {
            dispatch(fetchFeatureCollection())
        },
        []
    )

    return (
        <>
            <ControlledInteractiveClusterMap />
            <MapControlUiLayer />
        </>
    )
}

const MerchantMap = () => (
    <ReduxProvider store={merchantMapStore}>
        <ThemeProvider theme={theme.mui}>
            <Helmet
                defaultTitle="Händlerkarte"
                titleTemplate="Händlerkarte - %s"
            >
                <meta name="description" content="Händlerkarte" />
                <link rel="icon" href={`/static/img/favicon/${theme.favicon}`} />
            </Helmet>
            <ComponentRoot />
        </ThemeProvider>
    </ReduxProvider>
)

export default MerchantMap
