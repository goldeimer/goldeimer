import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { getTheme } from 'config/theme'
import ACTIONS, { reducer } from 'slices/app'
import makeStore from 'util/redux/store'

import AppRoot from 'components/root/AppRoot'

import InteractiveClusterMapStateContainer from
    '@map/MapGl/InteractiveClusterMapStateContainer'
import UiLayer from '@map/UiLayer/UiLayer'

const store = makeStore(reducer)
const theme = getTheme()

const MapAppInit = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(ACTIONS.map.features.source.fetch())
    }, [])

    return (
        <>
            <InteractiveClusterMapStateContainer />
            <UiLayer />
        </>
    )
}

const MapApp = () => (
    <AppRoot
        favicon={theme.favicon}
        store={store}
        theme={theme.mui}
        title="Händlerkarte"
    >
        <MapAppInit />
    </AppRoot>
)

export default MapApp
