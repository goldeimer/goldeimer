import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import MapGL, { Source, Layer } from 'react-map-gl'

import { MAP_TILER_API_KEY } from 'config/apiKeys'

import useMapGl from 'hooks/map/useMapGl'

import ContextMarker from 'components/map/ContextMarker'
import FeatureMarker from 'components/map/FeatureMarker'
import MapMarkersMemoized from 'components/map/MapMarkers'
import { MapMarkerEssentialPropTypesExact } from 'components/map/MapMarker'

const DEFAULT_VIEWPORT_CENTER = {
    latitude: 50.75,
    longitude: 10
}

const GEOJSON_SOURCE_ID = 'features'

const MAP_STYLE_URL = `https://api.maptiler.com/maps/dc1364cc-f025-4bac-9773-a5871f2b14eb/style.json?key=${MAP_TILER_API_KEY}`

const InteractiveClusterMap = ({
    context,
    featureCollection
}) => {
    const center = context || DEFAULT_VIEWPORT_CENTER
    const zoom = context ? 15 : 5

    const {
        flyTo,
        clusterCountLayer,
        clusterLayer,
        handleClick,
        handleViewportChange,
        mapRef,
        sourceRef,
        unclusteredFeatures,
        unclusteredPointLayer,
        viewport
    } = useMapGl(
        center,
        GEOJSON_SOURCE_ID,
        zoom
    )

    useEffect(
        () => {
            if (context) {
                flyTo(context.latitude, context.longitude)
            }
        },
        [context]
    )

    return (
        <MapGL
            {...viewport}
            width="100%"
            height="100%"
            attributionControl
            interactiveLayerIds={[
                clusterLayer.id,
                clusterCountLayer.id
            ]}
            mapboxApiAccessToken=""
            mapStyle={MAP_STYLE_URL}
            onClick={handleClick}
            onViewportChange={handleViewportChange}
            ref={mapRef}
            transitionDuration={500}
        >
            {featureCollection && (
                <Source
                    attribution=""
                    // mapbox-gl-js default: 128
                    buffer={64}
                    cluster
                    clusterMaxZoom={14}
                    clusterProperties={null}
                    clusterRadius={50}
                    data={featureCollection}
                    generateId
                    id={GEOJSON_SOURCE_ID}
                    maxzoom={17}
                    promoteId="uuid"
                    ref={sourceRef}
                    // mapbox-gl-js default: 0.375
                    tolerance={0.375}
                    type="geojson"
                >
                    <Layer {...clusterLayer} />
                    <Layer {...clusterCountLayer} />
                    <Layer {...unclusteredPointLayer} />
                </Source>
            )}
            {unclusteredFeatures && (
                <MapMarkersMemoized
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

InteractiveClusterMap.propTypes = {
    context: MapMarkerEssentialPropTypesExact,
    featureCollection: PropTypes.exact({
        type: PropTypes.string.isRequired,
        features: PropTypes.arrayOf(PropTypes.shape({
            type: PropTypes.string.isRequired,
            geometry: PropTypes.object.isRequired,
            properties: PropTypes.object.isRequired
        })).isRequired
    })
}

InteractiveClusterMap.defaultProps = {
    context: null,
    featureCollection: null
}

export default InteractiveClusterMap
