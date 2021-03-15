import React, { useLayoutEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Marker as MarkerGl } from 'react-map-gl'

import { useCallback } from '@goldeimer/react-util'

import MarkerContent from './MarkerContent'

const ANCHOR_TO = {
    center: 'center',
    top: 'top'
}

const calculateOffsets = (
    anchorTo,
    { height, width }
) => ({
    left: -(width / 2),
    top: -(anchorTo === ANCHOR_TO.top
        ? height
        : height / 2
    )
})

const DEFAULT_DIMENSIONS = { width: 32, height: 32 }

const Marker = ({
    anchorTo,
    defaultDimensions,
    latitude,
    longitude,
    ...other
}) => {
    const markerRef = useRef()

    const [dimensions, setDimensions] = useState(DEFAULT_DIMENSIONS)

    const handleDraw = useCallback(() => {
        if (markerRef.current) {
            const rect = markerRef.current.getBoundingClientRect()
            const { height, width } = rect

            setDimensions({ width, height })
        }
    }, [markerRef])

    const offsets = calculateOffsets(anchorTo, dimensions)

    useLayoutEffect(() => {
        handleDraw()
    }, [handleDraw])

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
