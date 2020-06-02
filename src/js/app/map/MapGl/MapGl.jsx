import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import MapGL, { Layer } from 'react-map-gl'

import Source from '@map/MapGl/Source'

import useMapGl from '@map/MapGl/useMapGl'
import { selectFilteredMapEssential } from '@map/selectFeatures'

import ContextMarker from '@map/MapGl/Markers/ContextMarker'
import FeatureMarker from '@map/MapGl/Markers/FeatureMarker'
import MarkersMemoized from '@map/MapGl/Markers'
import { MarkerEssentialPropTypesExact } from '@map/MapGl/Markers/Marker'

import { MAP_TILER_API_KEY } from '@config/apiKeys'

const MAP_STYLE_URL = `https://api.maptiler.com/maps/dc1364cc-f025-4bac-9773-a5871f2b14eb/style.json?key=${MAP_TILER_API_KEY}`

const MapGl = () => {
    const context = useSelector((state) => (state.map.context))
    const features = useSelector(selectFilteredMapEssential)

    const center = { latitude: 50.75, longitude: 10 }
    const zoom = 5

    const {
        flyTo,
        clusterCountLayer,
        clusterLayer,
        handleViewportChange,
        mapRef,
        sourceRef,
        unclusteredFeatures,
        unclusteredPointLayer,
        viewport
    } = useMapGl(
        center,
        'features',
        zoom
    )

    useEffect(
        () => {
            if (context) {
                flyTo(context.latitude, context.longitude)
            }
        },
        [context, flyTo]
    )

    return (
        <MapGL
            {...viewport}
            width='100%'
            height='100%'
            attributionControl
            mapboxApiAccessToken=''
            mapStyle={MAP_STYLE_URL}
            onViewportChange={handleViewportChange}
            ref={mapRef}
        >
            <Source featureCollection={features} ref={sourceRef}>
                <Layer {...clusterLayer} />
                <Layer {...clusterCountLayer} />
                <Layer {...unclusteredPointLayer} />
            </Source>
            {unclusteredFeatures && (
                <MarkersMemoized
                    component={FeatureMarker}
                    propsArray={unclusteredFeatures}
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
