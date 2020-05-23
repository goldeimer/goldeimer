import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import MapGL, { Source, Layer } from 'react-map-gl'
import { throttle } from 'throttle-debounce'

import { useTheme } from '@material-ui/core/styles'

import { MAP_TILER_API_KEY } from 'config/apiKeys'
import log from 'util/log'
import uniqueByKey from 'util/uniqueByKey'

import {
    MapMarkerEssentialPropTypesExact,
    transformGeoJsonFeatureToEssentialMarkerProps
} from 'components/MapMarker'
import MapMarkersMemoized from 'components/MapMarkers'

import makeLayers from './layers'

import FeatureMarker from './components/FeatureMarker'
import ProximityMarker from './components/ProximityMarker'

const DEFAULT_VIEWPORT_CENTER = {
    latitude: 50.75,
    longitude: 10
}

const DEFAULT_ZOOM_LEVEL = 5

const MAP_STYLE_URL = `https://api.maptiler.com/maps/dc1364cc-f025-4bac-9773-a5871f2b14eb/style.json?key=${MAP_TILER_API_KEY}`

const NEW_MARKER_ZOOM_LEVEL = 15

const GEOJSON_SOURCE_ID = 'features'

const noop = () => {}

const InteractiveClusterMap = ({
    featureCollection,
    featureMarker,
    proximityMarker
}) => {
    const mapRef = useRef()
    const sourceRef = useRef()

    const {
        clusterLayer,
        clusterCountLayer,
        unclusteredPointLayer
    } = makeLayers(useTheme())

    const [map, setMap] = useState(null)
    const [sourceFeatures, setSourceFeatures] = useState(null)

    const [viewport, setViewport] = useState({
        bearing: 0,
        latitude: (
            proximityMarker
                ? proximityMarker.latitude
                : DEFAULT_VIEWPORT_CENTER.latitude
        ),
        longitude: (
            proximityMarker
                ? proximityMarker.longitude
                : DEFAULT_VIEWPORT_CENTER.longitude
        ),
        pitch: 0,
        transitionDuration: 300,
        zoom: (
            proximityMarker
                ? NEW_MARKER_ZOOM_LEVEL
                : DEFAULT_ZOOM_LEVEL
        )
    })

    const handleViewportChange = (nextViewport) => {
        setViewport(nextViewport)
    }

    useEffect(
        () => {
            if (proximityMarker) {
                handleViewportChange(
                    {
                        ...viewport,
                        latitude: proximityMarker.latitude,
                        longitude: proximityMarker.longitude,
                        zoom: NEW_MARKER_ZOOM_LEVEL
                    }
                )
            }
        },
        [proximityMarker]
    )

    useEffect(
        () => {
            if (featureMarker) {
                handleViewportChange(
                    {
                        ...viewport,
                        latitude: featureMarker.latitude,
                        longitude: featureMarker.longitude,
                        zoom: NEW_MARKER_ZOOM_LEVEL
                    }
                )
            }
        },
        [featureMarker]
    )

    const querySourceFeatures = () => {
        if (!map) {
            return null
        }

        const features = uniqueByKey(
            map.querySourceFeatures(
                GEOJSON_SOURCE_ID,
                {
                    filter: ['!', ['has', 'point_count']]
                }
            ),
            'id'
        ).map(
            (feature) => transformGeoJsonFeatureToEssentialMarkerProps(feature)
        )

        setSourceFeatures(features)

        return features
    }

    const querySourceFeaturesThrottled = throttle(
        500,
        () => { querySourceFeatures() }
    )

    const handleIdle = () => { querySourceFeatures() }

    const handleMoveEnd = () => { querySourceFeaturesThrottled() }

    const handleSourceDataUpdate = (event) => {
        if (
            event.sourceId !== 'features' ||
            !event.isSourceLoaded
        ) {
            return
        }

        querySourceFeatures()
    }

    useEffect(() => {
        if (map) {
            map.on('idle', handleIdle)
            map.on('moveend', handleMoveEnd)
            map.on('sourcedata', handleSourceDataUpdate)

            return () => {
                map.off('idle', handleIdle)
                map.off('moveend', handleMoveEnd)
                map.off('sourcedata', handleSourceDataUpdate)
            }
        }

        return noop
    }, [map])

    useEffect(() => {
        if (mapRef.current) {
            setMap(mapRef.current.getMap())
        }
    }, [mapRef])

    const handleClusterClick = (feature) => {
        const clusterId = feature.properties.cluster_id
        const source = sourceRef.current.getSource()

        source.getClusterExpansionZoom(
            clusterId,
            (err, zoom) => {
                if (err) {
                    return
                }

                handleViewportChange({
                    ...viewport,
                    latitude: feature.geometry.coordinates[1],
                    longitude: feature.geometry.coordinates[0],
                    zoom
                })
            }
        )
    }

    const handleMarkerClick = (feature) => {
        // TODO:
        // Implement detail info UI.
        log(feature)
    }

    const handleClick = (event) => {
        if (GEOJSON_SOURCE_ID in event && event.features.length) {
            const feature = event.features[0]

            if ('layer' in feature) {
                switch (feature.layer.id) {
                case clusterLayer.id:
                case clusterCountLayer.id:
                    handleClusterClick(feature)
                    return

                case unclusteredPointLayer.id:
                    handleMarkerClick(feature)
                    break

                default:
                }
            }
        }
    }

    return (
        <MapGL
            {...viewport}
            width="100%"
            height="100%"
            attributionControl
            interactiveLayerIds={
                [
                    clusterLayer.id,
                    clusterCountLayer.id,
                    unclusteredPointLayer.id
                ]
            }
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
