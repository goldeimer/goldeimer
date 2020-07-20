import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, useParams } from 'react-router-dom'

import { getTheme } from '@config/theme'

import MapGl from '@map/MapGl'
import ContextDrawer from '@map/context/ContextDrawer'
import FeatureBrowser from '@map/features/FeatureBrowser'
import FilterMenu from '@map/filter/FilterMenu'
import SearchContainer from '@map/search/SearchContainer'
import { FeatureBrowserIcon } from '@map/icons'
import ZoomControl from '@map/view/ZoomControl'

import FEATURES, { useSourceRedeivedAt } from '@map/features'
import ROUTE from '@map/routes'

const MAX_SOURCE_AGE_IN_HOURS = 48

const { logoIconComponent: LogoIconComponent } = getTheme()

const SecondaryUi = () => {
    const { secondaryUiRoute } = useParams()

    return (
        <>
            <FilterMenu
                title='Händlerkarte'
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

    const sourceReceivedAt = useSourceRedeivedAt()

    useEffect(() => {
        const shouldDispatch = () => {
            if (!sourceReceivedAt) {
                return true
            }

            return (
                MAX_SOURCE_AGE_IN_HOURS <
                (Date.now() - sourceReceivedAt) / 36e5
            )
        }

        if (shouldDispatch()) {
            dispatch(FEATURES.source.fetch())
        }
    }, [dispatch, sourceReceivedAt])

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
