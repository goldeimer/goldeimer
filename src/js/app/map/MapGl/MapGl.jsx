/// Holds `react-map-gl`'s central component, (`InteractiveMap`)[1].
///
/// @see [1]: http://visgl.github.io/react-map-gl/docs/api-reference/interactive-map

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MapGL, { Layer } from 'react-map-gl'

import { makeStyles } from '@material-ui/core/styles'

import {
    useSourceFeatures,
    useViewFeatures,
    FEATURE_FORMAT
} from '@map/features'
import { useLayers } from '@map/layers'
import { useSearchResult } from '@map/search'
import VIEW, { selectTransition, selectViewState } from '@map/view'

import FeatureMarker from '@map/MapGl/Markers/FeatureMarker'
import Markers from '@map/MapGl/Markers'
import SearchResultMarker from '@map/MapGl/Markers/SearchResultMarker'
import Source from '@map/MapGl/Source'

import { MAP_TILER_API_KEY } from '@config/apiKeys'

const MAP_STYLE_URL = `https://api.maptiler.com/maps/dc1364cc-f025-4bac-9773-a5871f2b14eb/style.json?key=${MAP_TILER_API_KEY}`

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
            color: palette.getContrastText('#fff'),
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

    const features = useSourceFeatures(FEATURE_FORMAT.mapGl)
    const { markers } = useViewFeatures()
    const searchResult = useSearchResult()
    const transition = useSelector(selectTransition)

    const syncedViewState = useSelector(selectViewState)

    useEffect(() => {
        if (isLoading) {
            setViewState(syncedViewState)
            setIsLoading(false)
        }
    }, [isLoading, syncedViewState])

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

    const { handleLayerClick, layers } = useLayers({
        mapRef,
        sourceId: 'features',
        sourceRef
    })

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
                // TODO: Remove after fixing transitions.
                doubleClickZoom={false}
                interactiveLayerIds={[
                    layers.clusterLayer.id,
                    layers.clusterCountLayer.id
                ]}
                mapboxApiAccessToken=''
                mapOptions={{
                    // customAttribution: '<a href="https://github.com/jpilkahn" target="_blank">© Agentur Alk & Flens</a>'
                }}
                mapStyle={MAP_STYLE_URL}
                onClick={handleLayerClick}
                onDblClick={handleLayerClick}
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
                    <Layer {...layers.clusterCountLayer} />
                    <Layer {...layers.unclusteredPointLayer} />
                </Source>
                {markers && (
                    <Markers
                        component={FeatureMarker}
                        propsArray={markers}
                    />
                )}
                {searchResult && (
                    <SearchResultMarker
                        {...searchResult}
                    />
                )}
            </MapGL>
        </div>
    )
}

export default MapGl
