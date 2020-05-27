import React, { useEffect } from 'react'
import { Provider as ReduxProvider, useDispatch } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { BrowserRouter as Router } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { fetchFeatures } from 'actions/merchantMapActions'

import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import { getTheme } from 'config/theme'
import merchantMapReducer from 'reducers/map/mapReducer'

import InteractiveClusterMapStateContainer from
    './MapGl/InteractiveClusterMapStateContainer'
import UiLayer from './UiLayer/UiLayer'

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
            dispatch(fetchFeatures())
        },
        []
    )

    return (
        <>
            <InteractiveClusterMapStateContainer />
            <UiLayer />
        </>
    )
}

const MerchantMap = () => (
    <ReduxProvider store={merchantMapStore}>
        <ThemeProvider theme={theme.mui}>
            <Router>
                <Helmet
                    defaultTitle="Händlerkarte"
                    titleTemplate="Händlerkarte - %s"
                >
                    <meta name="description" content="Händlerkarte" />
                    <link rel="icon" href={`/static/${theme.favicon}`} />
                </Helmet>
                <CssBaseline />
                <ComponentRoot />
            </Router>
        </ThemeProvider>
    </ReduxProvider>
)

export default MerchantMap
