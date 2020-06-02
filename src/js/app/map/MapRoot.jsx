import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, useParams } from 'react-router-dom'

import { getTheme } from '@config/theme'

import MapGl from '@map/MapGl'
import FeatureBrowser from '@map/features/FeatureBrowser'
import FilterSelector from '@map/filter/FilterSelector'
import SearchContainer from '@map/search/SearchContainer'
import ZoomControl from '@map/MapGl/ZoomControl'

import ListIcon from '@lib/components/icons/ui/ListIcon'

import APP from '@app/app'
import VIEW_ID from '@map/views'

const { logoIconComponent: LogoIconComponent } = getTheme()

const SecondaryUi = () => {
    const { viewId } = useParams()

    return (
        <>
            <FilterSelector
                title='Händlerkarte'
                isInitiallyOpen={viewId === VIEW_ID.menu}
                titleIcon={<LogoIconComponent />}
            />
            <FeatureBrowser
                title='Liste aller Einträge'
                isInitiallyOpen={viewId === VIEW_ID.browse}
                titleIcon={<ListIcon />}
            />
        </>
    )
}

const MapRoot = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(APP.map.features.source.fetch())
    }, [dispatch])

    return (
        <>
            <MapGl />
            <Route path='/:viewId'>
                <SecondaryUi />
            </Route>
            <SearchContainer />
            <ZoomControl />
        </>
    )
}

export default MapRoot
