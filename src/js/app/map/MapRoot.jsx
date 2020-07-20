import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch, useParams } from 'react-router-dom'

import { getTheme } from '@config/theme'

import MapGl from '@map/MapGl'
import ContextDrawer from '@map/context/ContextDrawer'
import FeatureBrowser from '@map/features/FeatureBrowser'
import FilterMenu from '@map/filter/FilterMenu'
import SearchContainer from '@map/search/SearchContainer'
import { FeatureBrowserIcon } from '@map/icons'
import ZoomControl from '@map/view/ZoomControl'

import FEATURES from '@map/features'
import ROUTE from '@map/routes'

const { logoIconComponent: LogoIconComponent } = getTheme()

const SecondaryUi = () => {
    const { secondaryUiRoute } = useParams()

    return (
        <>
            <FilterMenu
                title='HändlerInnenkarte'
                isInitiallyOpen={ROUTE.menu.is(secondaryUiRoute)}
                titleIcon={<LogoIconComponent />}
            />
            <FeatureBrowser
                title='Liste aller Einträge'
                isInitiallyOpen={ROUTE.browse.is(secondaryUiRoute)}
                titleIcon={<FeatureBrowserIcon />}
            />
        </>
    )
}

const MapRoot = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(FEATURES.source.fetch())
    }, [dispatch])

    return (
        <>
            <MapGl />
            <Route path='/:secondaryUiRoute'>
                <SecondaryUi />
            </Route>
            <Route path='/'>
                <ContextDrawer
                    isOpenIfContext
                />
            </Route>
            <ZoomControl />
            <SearchContainer />
        </>
    )
}

export default MapRoot
