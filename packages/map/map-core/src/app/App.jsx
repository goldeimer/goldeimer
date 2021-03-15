import React from 'react'

import { AppRoot } from '@goldeimer/react-components'
import { makeStore } from '@goldeimer/redux-util'

import { getTheme } from '../config/theme'

import MapRoot from './map/MapRoot'

import { ROOT_REDUCER } from './app'

const { persistor, store } = makeStore(ROOT_REDUCER)

const theme = getTheme()

const App = () => (
    <AppRoot
        favicon={theme.favicon}
        persistor={persistor}
        store={store}
        theme={theme.mui}
        title="Händlerkarte"
    >
        <MapRoot />
    </AppRoot>
)

export default App
