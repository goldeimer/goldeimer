import React, { useLayoutEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Marker as MarkerGl } from 'react-map-gl'

import MarkerContent from '@map/MapGl/Markers/MarkerContent'

const ANCHOR_TO = {
    center: 'center',
    top: 'top'
}

const calculateOffsets = (
    anchorTo,
    { height, width }
) => ({
    // TODO: Grab bounding client rect from DOM node.
    left: -(width / 2),
    top: -(anchorTo === ANCHOR_TO.top
        ? height
        : height / 2
    )
})

const DEFAULT_DIMENSIONS = { height: 24, width: 24 }

const Marker = ({
    anchorTo,
    defaultDimensions,
    latitude,
    longitude,
    ...other
}) => {
    const dimensionsRef = useRef()
    const markerRef = useRef()

    useLayoutEffect(() => {
        if (markerRef.current) {
            const { height, width } = markerRef.current.getBoundingClientRect()

            dimensionsRef.current = { height, width }
        }
    }, [markerRef])

    const dimensions = dimensionsRef.current
        ? dimensionsRef.current
        : defaultDimensions

    const offsets = calculateOffsets(anchorTo, dimensions)

    return (
        <MarkerGl
            latitude={latitude}
            longitude={longitude}
            offsetLeft={offsets.left}
            offsetTop={offsets.top}
        >
            <MarkerContent
                ref={markerRef}
                latitude={latitude}
                longitude={longitude}
                {...other}
            />
        </MarkerGl>
    )
}

Marker.propTypes = {
    anchorTo: PropTypes.string,
    defaultDimensions: PropTypes.exact({
        height: PropTypes.number,
        width: PropTypes.number
    }),
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired
}

Marker.defaultProps = {
    anchorTo: ANCHOR_TO.top,
    defaultDimensions: DEFAULT_DIMENSIONS
}

export {
    Marker as default,
    ANCHOR_TO
}
