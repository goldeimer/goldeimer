import { useEffect, useRef, useState } from 'react'
import { FlyToInterpolator } from 'react-map-gl'
import { throttle } from 'throttle-debounce'

import { useTheme } from '@material-ui/core/styles'

import noop from 'utilities/noop'

import { transformGeoJsonFeaturesToMarkerProps }
    from 'utilities/map/transformations'

import uniqueByKey from 'utilities/array/uniqueByKey'

const DEFAULT_VIEWPORT_TRANSITION_DURATION = 300
const NEW_MARKER_ZOOM_LEVEL = 15

const makeLayers = (theme) => ({
    clusterLayer: {
        id: 'clusters',
        type: 'circle',
        source: 'features',
        filter: ['has', 'point_count'],
        paint: {
            'circle-color': theme.palette.primary.main,
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                15,
                10, 18,
                20, 21,
                50, 24,
                100, 27,
                200, 30,
                500, 33
            ],
            'circle-stroke-width': 1,
            'circle-stroke-color': theme.palette.getContrastText(
                theme.palette.primary.main
            )
        }
    },
    clusterCountLayer: {
        id: 'cluster-count',
        type: 'symbol',
        source: 'features',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': [
                'DIN Offc Pro Medium',
                'Arial Unicode MS Bold'
            ],
            'text-size': 12
        },
        paint: {
            'text-color': theme.palette.layerHighlight.main
        }
    },
    unclusteredPointLayer: {
        id: 'unclustered-point',
        type: 'circle',
        source: 'features',
        filter: ['!', ['has', 'point_count']],
        layout: { visibility: 'none' }
    }
})

const useMapGl = (
    center = { latitude: 0, longitude: 0 },
    geoJsonSourceId = 'features',
    zoomLevel = 5
) => {
    const mapRef = useRef()
    const sourceRef = useRef()

    const {
        clusterLayer,
        clusterCountLayer,
        unclusteredPointLayer
    } = makeLayers(useTheme())

    const [map, setMap] = useState(null)
    const [unclusteredFeatures, setUnclusteredFeatures] = useState(null)
    const [viewport, setViewport] = useState({
        bearing: 0,
        latitude: center.latitude,
        longitude: center.longitude,
        pitch: 0,
        transitionDuration: DEFAULT_VIEWPORT_TRANSITION_DURATION,
        zoom: zoomLevel
    })

    const handleViewportChange = (nextViewport) => {
        setViewport({
            ...viewport,
            transitionDuration: DEFAULT_VIEWPORT_TRANSITION_DURATION,
            ...nextViewport
        })
    }

    const flyToInterpolator = new FlyToInterpolator({ speed: 1.2 })
    const flyTo = (latitude, longitude) => {
        handleViewportChange({
            latitude,
            longitude,
            transitionInterpolator: flyToInterpolator,
            transitionDuration: 'auto',
            zoom: NEW_MARKER_ZOOM_LEVEL
        })
    }

    useEffect(() => {
        const querySourceFeatures = () => {
            if (!map) {
                return null
            }

            const features = transformGeoJsonFeaturesToMarkerProps(
                uniqueByKey(
                    map.querySourceFeatures(
                        geoJsonSourceId,
                        {
                            filter: ['!', ['has', 'point_count']]
                        }
                    ),
                    'id'
                )
            )

            setUnclusteredFeatures(features)

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
    }, [map, geoJsonSourceId])

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
                    latitude: feature.geometry.coordinates[1],
                    longitude: feature.geometry.coordinates[0],
                    zoom
                })
            }
        )
    }

    const handleClick = (event) => {
        if (geoJsonSourceId in event && event.features.length) {
            const feature = event.features[0]

            if ('layer' in feature) {
                switch (feature.layer.id) {
                case clusterLayer.id:
                case clusterCountLayer.id:
                    handleClusterClick(feature)
                    break

                default:
                }
            }
        }
    }

    return {
        flyTo,
        clusterCountLayer,
        clusterLayer,
        handleClick,
        handleViewportChange,
        mapRef,
        unclusteredFeatures,
        sourceRef,
        unclusteredPointLayer,
        viewport
    }
}

export default useMapGl
