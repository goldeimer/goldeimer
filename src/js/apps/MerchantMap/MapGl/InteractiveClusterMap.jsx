import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import MapGL, { Source, Layer } from 'react-map-gl'

import { MAP_TILER_API_KEY } from 'config/apiKeys'

import useMapGl from 'hooks/map/useMapGl'
import { makeFeatureCollection } from 'util/map/geoJsonUtil'

import FeatureMarker from 'components/map/FeatureMarker'
import MapMarkersMemoized from 'components/map/MapMarkers'
import ProximityMarker from 'components/map/ProximityMarker'
import { MapMarkerEssentialPropTypesExact } from 'components/map/MapMarker'

const DEFAULT_VIEWPORT_CENTER = {
    latitude: 50.75,
    longitude: 10
}

const GEOJSON_SOURCE_ID = 'features'

const MAP_STYLE_URL = `https://api.maptiler.com/maps/dc1364cc-f025-4bac-9773-a5871f2b14eb/style.json?key=${MAP_TILER_API_KEY}`

const InteractiveClusterMap = ({
    features,
    featureMarker,
    proximityMarker
}) => {
    const center = proximityMarker || DEFAULT_VIEWPORT_CENTER
    const zoom = proximityMarker ? 15 : 5

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
            if (proximityMarker) {
                flyTo(proximityMarker.latitude, proximityMarker.longitude)
            }
        },
        [proximityMarker]
    )

    useEffect(
        () => {
            if (featureMarker) {
                flyTo(featureMarker.latitude, featureMarker.longitude)
            }
        },
        [featureMarker]
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
            {features && (
                <Source
                    attribution=""
                    // mapbox-gl-js default: 128
                    buffer={64}
                    cluster
                    clusterMaxZoom={14}
                    clusterProperties={null}
                    clusterRadius={50}
                    data={makeFeatureCollection(features)}
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
            {featureMarker && (
                <FeatureMarker
                    {...featureMarker}
                />
            )}
            {proximityMarker && (
                <ProximityMarker
                    {...proximityMarker}
                />
            )}
        </MapGL>
    )
}

InteractiveClusterMap.propTypes = {
    features: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string.isRequired,
        geometry: PropTypes.object.isRequired,
        properties: PropTypes.object.isRequired
    })),
    featureMarker: MapMarkerEssentialPropTypesExact,
    proximityMarker: MapMarkerEssentialPropTypesExact
}

InteractiveClusterMap.defaultProps = {
    features: null,
    featureMarker: null,
    proximityMarker: null
}

export default InteractiveClusterMap
