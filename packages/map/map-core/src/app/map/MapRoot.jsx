import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, useParams } from 'react-router-dom'

import { getTheme } from '../../config/theme'

import MapGl from './MapGl'
import ContextDrawer from './context/ContextDrawer'
import FeatureBrowser from './feature/FeatureBrowser'
import FilterMenu from './filter/FilterMenu'
import SearchContainer from './search/SearchContainer'
import { FeatureBrowserIcon } from './icon'
import ZoomControl from './view/ZoomControl'

import Features, { useSourceRedeivedAt } from './feature'
import RouteSlug from './routing'

const MAX_SOURCE_AGE_IN_HOURS = 48

const { logoIconComponent: LogoIconComponent } = getTheme()

const SecondaryUi = () => {
    const { secondaryUiRoute } = useParams()

    return (
        <>
            <FilterMenu
                title="Händlerkarte"
                isInitiallyOpen={secondaryUiRoute === RouteSlug.MENU}
                titleIcon={<LogoIconComponent />}
            />
            <FeatureBrowser
                title="Liste aller Einträge"
                isInitiallyOpen={secondaryUiRoute === RouteSlug.BROWSE}
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
                MAX_SOURCE_AGE_IN_HOURS
                < (Date.now() - sourceReceivedAt) / 36e5
            )
        }

        if (shouldDispatch()) {
            dispatch(Features.source.fetch())
        }
    }, [dispatch, sourceReceivedAt])

    return (
        <>
            <MapGl />
            <Route path="/:secondaryUiRoute">
                <SecondaryUi />
            </Route>
            <Route path="/">
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
