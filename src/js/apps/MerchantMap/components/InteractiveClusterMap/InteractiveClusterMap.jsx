import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import MapGL, { Source, Layer } from 'react-map-gl'

import { useTheme } from '@material-ui/core/styles'

import { MAP_TILER_API_KEY } from 'config/apiKeys'
import log from 'util/log'

import makeLayers from './layers'

const MAP_STYLE_URL = `https://api.maptiler.com/maps/dc1364cc-f025-4bac-9773-a5871f2b14eb/style.json?key=${MAP_TILER_API_KEY}`

const DEFAULT_VIEWPORT_CENTER = {
    latitude: 50.75,
    longitude: 10
}

const DEFAULT_ZOOM_LEVEL = 5

const NEW_PROXIMITY_MARKER_ZOOM_LEVEL = 15

const InteractiveClusterMap = ({
    featureCollection,
    proximityMarker
}) => {
    const sourceRef = useRef()

    const {
        clusterLayer,
        clusterCountLayer,
        unclusteredPointLayer
    } = makeLayers(useTheme())

    const [viewport, setViewport] = useState({
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
        zoom: (
            proximityMarker
                ? NEW_PROXIMITY_MARKER_ZOOM_LEVEL
                : DEFAULT_ZOOM_LEVEL
        ),
        bearing: 0,
        pitch: 0
    })

    useEffect(
        () => {
            if (proximityMarker) {
                handleViewportChange(
                    {
                        ...viewport,
                        latitude: proximityMarker.latitude,
                        longitude: proximityMarker.longitude,
                        zoom: NEW_PROXIMITY_MARKER_ZOOM_LEVEL,
                        transitionDuration: 600
                    }
                )
            }
        },
        [proximityMarker]
    )

    const handleViewportChange = (nextViewport) => { setViewport(nextViewport) }

    const handleClusterClick = (feature) => {
        const clusterId = feature.properties.cluster_id
        const mapboxSource = sourceRef.current.getSource()

        mapboxSource.getClusterExpansionZoom(
            clusterId,
            (err, zoom) => {
                if (err) {
                    return
                }

                handleViewportChange({
                    ...viewport,
                    latitude: feature.geometry.coordinates[1],
                    longitude: feature.geometry.coordinates[0],
                    zoom,
                    transitionDuration: 300
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
        if ('features' in event && event.features.length) {
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
            attributionControl={false}
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
            transitionDuration={500}
        >
            {featureCollection && (
                <Source
                    type="geojson"
                    data={featureCollection}
                    cluster
                    clusterMaxZoom={14}
                    clusterRadius={50}
                    generateId
                    ref={sourceRef}
                >
                    <Layer {...clusterLayer} />
                    <Layer {...clusterCountLayer} />
                    <Layer {...unclusteredPointLayer} />
                </Source>
            )}
        </MapGL>
    )
}

InteractiveClusterMap.propTypes = {
    /* eslint-disable-next-line react/forbid-prop-types */
    featureCollection: PropTypes.object,
    proximityMarker: PropTypes.exact({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        placeName: PropTypes.string
    })
}

InteractiveClusterMap.defaultProps = {
    featureCollection: null,
    proximityMarker: null
}

export default InteractiveClusterMap
