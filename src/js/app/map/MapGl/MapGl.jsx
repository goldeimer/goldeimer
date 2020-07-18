/// Holds `react-map-gl`'s central component, (`InteractiveMap`)[1].
///
/// @see [1]: http://visgl.github.io/react-map-gl/docs/api-reference/interactive-map

import { makeStyles } from '@material-ui/core/styles'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MapGL, { Layer } from 'react-map-gl'

import { useContext } from '@map/context'
import {
    useSourceFeatures,
    useViewFeatures,
    FEATURE_FORMAT
} from '@map/features'
import { useSearchResult, SEARCH_RESULT_TYPE } from '@map/search'
import VIEW, { selectTransition, selectViewState } from '@map/view'

import useMapGlInstance from '@map/MapGl/useMapGlInstance'
import ClusterMarker from '@map/MapGl/Markers/ClusterMarker'
import FeatureMarker from '@map/MapGl/Markers/FeatureMarker'
import Markers from '@map/MapGl/Markers'
import SearchResultMarker from '@map/MapGl/Markers/SearchResultMarker'
import Source from '@map/MapGl/Source'

import { MAP_TILER_API_KEY } from '@config/apiKeys'

const MAP_STYLE_URL = `https://api.maptiler.com/maps/dc1364cc-f025-4bac-9773-a5871f2b14eb/style.json?key=${MAP_TILER_API_KEY}`

const MAP_OPTIONS = {
    customAttribution: (
        '<a href="https://github.com/jpilkahn" target="_blank">© Alk & Flens</a>'
    )
}

const useStyles = makeStyles(({
    borderRadius,
    palette,
    typography
}) => ({
    root: {
        height: '100%',
        width: '100%'
    },
    attribution: {
        '& .mapboxgl-ctrl-bottom-right': {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 'auto'
        },
        '& .mapboxgl-ctrl-attrib': {
            borderRadius,
            color: palette.text.secondary,
            fontFamily: typography.fontFamily,
            opacity: 0.6
        }
    }
}))

const MapGl = () => {
    const mapRef = useRef()
    const sourceRef = useRef()
    const transitionIdRef = useRef(null)

    const classes = useStyles()
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(true)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [viewState, setViewState] = useState({})

    const features = useSourceFeatures(FEATURE_FORMAT.mapGl)
    const {
        clusters,
        markers
        // pointCounts
    } = useViewFeatures()

    const searchResult = useSearchResult()
    const syncedViewState = useSelector(selectViewState)
    const transition = useSelector(selectTransition)

    const context = useContext()
    const contextInfo = (({ id, type } = context) => ({ id, type }))()

    const makeViewStateProps = () => {
        const { id, ...props } = transition

        if (id && id !== transitionIdRef.current) {
            transitionIdRef.current = id

            return {
                ...viewState,
                ...props
            }
        }

        return viewState
    }

    useEffect(() => {
        if (isLoading) {
            setViewState(syncedViewState)
            setIsLoading(false)
        }
    }, [isLoading, syncedViewState])

    const { layers } = useMapGlInstance({
        mapRef,
        sourceId: 'features'
    })

    const getSource = () => sourceRef.current.getSource()

    /// @see [`InteractiveMap::onViewStateChange`](1)
    /// @see [State Management](2)
    ///
    /// [1]: http://visgl.github.io/react-map-gl/docs/api-reference/interactive-map#onviewportchange
    /// [2]: http://visgl.github.io/react-map-gl/docs/get-started/state-management
    const handleViewStateChange = useCallback(({
        viewState: nextViewState
        // interactionState,
        // oldViewState
    }) => {
        if (!isLoading) {
            setViewState(nextViewState)

            if (!isTransitioning) {
                dispatch(VIEW.state.sync(nextViewState))
            }
        }
    }, [dispatch, isLoading, isTransitioning])

    const handleTransitionStart = () => setIsTransitioning(true)

    const handleTransitionEnd = () => {
        setIsTransitioning(false)
        dispatch(VIEW.state.sync(viewState))
    }

    return (
        <div className={classes.root}>
            <MapGL
                width='100%'
                height='100%'
                {...makeViewStateProps()}
                attributionControl
                className={classes.attribution}
                mapboxApiAccessToken=''
                mapOptions={MAP_OPTIONS}
                mapStyle={MAP_STYLE_URL}
                onTransitionEnd={handleTransitionEnd}
                onTransitionStart={handleTransitionStart}
                onViewStateChange={handleViewStateChange}
                ref={mapRef}
            >
                <Source
                    featureCollection={features}
                    ref={sourceRef}
                >
                    <Layer {...layers.clusterLayer} />
                    <Layer {...layers.unclusteredPointLayer} />
                </Source>
                {clusters && (
                    <Markers
                        component={ClusterMarker}
                        contextInfo={contextInfo}
                        dynamicComponentProps={clusters}
                        staticComponentProps={{ getSource }}
                    />
                )}
                {markers && (
                    <Markers
                        component={FeatureMarker}
                        contextInfo={contextInfo}
                        dynamicComponentProps={markers}
                    />
                )}
                {searchResult &&
                !SEARCH_RESULT_TYPE.feature.is(searchResult.type) && (
                    <SearchResultMarker
                        {...searchResult}
                    />
                )}
            </MapGL>
        </div>
    )
}

export default MapGl
