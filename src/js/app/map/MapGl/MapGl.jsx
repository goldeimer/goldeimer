/// Holds `react-map-gl`'s central component, (`InteractiveMap`)[1].
///
/// @see [1]: http://visgl.github.io/react-map-gl/docs/api-reference/interactive-map

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MapGL, { Layer } from 'react-map-gl'

import { makeStyles } from '@material-ui/core/styles'

import useMapGl from '@map/MapGl/useMapGl'
import {
    useSourceFeatures,
    useViewportFeatures,
    FEATURE_FORMAT
} from '@map/features'
import VIEWPORT from '@map/viewport'

import ContextMarker from '@map/MapGl/Markers/ContextMarker'
import FeatureMarker from '@map/MapGl/Markers/FeatureMarker'
import Markers from '@map/MapGl/Markers'
import { MarkerEssentialPropTypesExact } from '@map/MapGl/Markers/Marker'
import Source from '@map/MapGl/Source'

import { MAP_TILER_API_KEY } from '@config/apiKeys'

const MAP_STYLE_URL = `https://api.maptiler.com/maps/dc1364cc-f025-4bac-9773-a5871f2b14eb/style.json?key=${MAP_TILER_API_KEY}`

const useStyles = makeStyles((theme) => ({
    attribution: {
        // TODO: Better way of overriding?
        '& .mapboxgl-ctrl-bottom-right': {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 'auto'
        },
        '& .mapboxgl-ctrl-attrib': {
            borderRadius: theme.borderRadius,
            color: theme.palette.getContrastText('#fff'),
            fontFamily: theme.typography.fontFamily,
            opacity: 0.6
        }
    }
}))

const MapGl = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const context = useSelector((state) => (state.map.context))
    const features = useSourceFeatures(FEATURE_FORMAT.mapGl)
    const { markers } = useViewportFeatures()

    const {
        clusterCountLayer,
        clusterLayer,
        handleClick,
        handleViewportChange,
        mapRef,
        sourceRef,
        unclusteredPointLayer,
        viewport
    } = useMapGl('features')

    useEffect(() => {
        if (context) {
            dispatch(VIEWPORT.transition.flyTo(
                context.latitude,
                context.longitude
            ))
        }
    }, [context, dispatch])

    return (
        <MapGL
            {...viewport}
            width='100%'
            height='100%'
            attributionControl
            className={classes.attribution}
            // TODO: Remove after fixing transitions.
            doubleClickZoom={false}
            interactiveLayerIds={[clusterLayer.id, clusterCountLayer.id]}
            mapboxApiAccessToken=''
            mapOptions={{
                customAttribution:
                    '<a href="" target="_blank">© 2020 Agentur Alk & Flens</a>'
            }}
            mapStyle={MAP_STYLE_URL}
            onClick={handleClick}
            onDblClick={handleClick}
            onViewportChange={handleViewportChange}
            ref={mapRef}
        >
            <Source
                featureCollection={features}
                ref={sourceRef}
            >
                <Layer {...clusterLayer} />
                <Layer {...clusterCountLayer} />
                <Layer {...unclusteredPointLayer} />
            </Source>
            {markers && (
                <Markers
                    component={FeatureMarker}
                    propsArray={markers}
                />
            )}
            {context && (
                <ContextMarker
                    {...context}
                />
            )}
        </MapGL>
    )
}

MapGl.propTypes = {
    context: MarkerEssentialPropTypesExact
}

MapGl.defaultProps = {
    context: null
}

export default MapGl
