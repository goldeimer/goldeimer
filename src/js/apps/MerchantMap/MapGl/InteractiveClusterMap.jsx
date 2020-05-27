import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import MapGL, { Source, Layer } from 'react-map-gl'

import { MAP_TILER_API_KEY } from 'config/apiKeys'

import useMapGl from 'hooks/map/useMapGl'

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
    featureCollection,
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
        sourceFeatures,
        sourceRef,
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
            {sourceFeatures && (
                <MapMarkersMemoized
                    component={FeatureMarker}
                    propsArray={sourceFeatures}
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
    /* eslint-disable-next-line react/forbid-prop-types */
    featureCollection: PropTypes.object,
    featureMarker: MapMarkerEssentialPropTypesExact,
    proximityMarker: MapMarkerEssentialPropTypesExact
}

InteractiveClusterMap.defaultProps = {
    featureCollection: null,
    featureMarker: null,
    proximityMarker: null
}

export default InteractiveClusterMap
