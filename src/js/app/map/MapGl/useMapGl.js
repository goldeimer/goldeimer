import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { useTheme } from '@material-ui/core/styles'

import FEATURES from '@map/features'
import makeLayers from '@map/MapGl/makeLayers'
import VIEWPORT, { useViewport } from '@map/viewport'

import noop from '@lib/util/noop'
import uniqueByKey from '@lib/util/array/uniqueByKey'
import useDebounce from '@lib/hooks/useDebounce'
import useCallback from '@lib/hooks/useCallback'
import useMemo from '@lib/hooks/useMemo'

const querySourceFeatures = (mapGl, sourceId, dispatchFeatures) => {
    if (!mapGl) {
        return
    }

    dispatchFeatures({
        // TODO: implement!
        clusters: [],
        markers: uniqueByKey(
            mapGl.querySourceFeatures(
                sourceId,
                { filter: ['!', ['has', 'point_count']] }
            ),
            'id'
        )
    })
}

const attachEventHandler = (eventIds, handler, target, handlerCache) => {
    eventIds.forEach((eventId) => {
        target.on(eventId, handler)
        handlerCache.push([eventId, handler])
    })
}

const detachEventHandlers = (target, handlerCache) => {
    handlerCache.forEach(([eventId, handler]) => (
        target.off(eventId, handler)
    ))
}

const DEBOUNCED_UPDATE_TRIGGER = ['sourcedata']
const IMMEDIATE_UPDATE_TRIGGER = ['idle']

const useMapGl = (sourceId = 'features') => {
    const mapRef = useRef()
    const mapGlInstanceRef = useRef()
    const sourceRef = useRef()

    const theme = useTheme()
    const dispatch = useDispatch()

    const [viewport, handleViewportChange] = useViewport()

    const {
        clusterLayer,
        clusterCountLayer,
        unclusteredPointLayer
    } = useMemo(() => makeLayers(theme), [theme])

    useEffect(() => {
        if (mapRef.current) {
            mapGlInstanceRef.current = mapRef.current.getMap()
        }
    }, [mapRef])

    const queryFeatures = useCallback(() => querySourceFeatures(
        mapGlInstanceRef.current,
        sourceId,
        (features) => dispatch(FEATURES.viewport.set(features))
    ), [dispatch, sourceId])

    const [debouncedQueryFeatures] = useDebounce(
        queryFeatures, 200, false, 500
    )

    useEffect(() => {
        if (mapGlInstanceRef.current) {
            const handlerCache = []

            attachEventHandler(
                DEBOUNCED_UPDATE_TRIGGER,
                debouncedQueryFeatures,
                mapGlInstanceRef.current,
                handlerCache
            )
            attachEventHandler(
                IMMEDIATE_UPDATE_TRIGGER,
                queryFeatures,
                mapGlInstanceRef.current,
                handlerCache
            )

            return () => {
                detachEventHandlers(mapGlInstanceRef.current, handlerCache)
            }
        }

        return noop
    }, [sourceId, queryFeatures, debouncedQueryFeatures])

    const handleClick = (event) => {
        if (!event.features) {
            return
        }

        const feature = event.features[0]
        if (!feature) {
            return
        }

        const clusterId = feature.properties.cluster_id
        if (!clusterId) {
            return
        }

        sourceRef.current.getSource().getClusterExpansionZoom(
            clusterId,
            (err, zoom) => {
                if (err) {
                    return
                }

                dispatch([
                    VIEWPORT.coordinates.set({
                        longitude: feature.geometry.coordinates[0],
                        latitude: feature.geometry.coordinates[1]
                    }),
                    VIEWPORT.zoom.set(zoom)
                ])
            }
        )
    }

    return {
        clusterCountLayer,
        clusterLayer,
        handleClick,
        handleViewportChange,
        mapRef,
        sourceRef,
        unclusteredPointLayer,
        viewport
    }
}

export default useMapGl
