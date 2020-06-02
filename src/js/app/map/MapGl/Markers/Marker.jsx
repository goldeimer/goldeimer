import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Marker as MarkerGl } from 'react-map-gl'

import { useTheme } from '@material-ui/core/styles'

import MarkerContent from '@map/MapGl/Markers/MarkerContent'

const ANCHOR_TO = {
    center: 'center',
    top: 'top'
}

const calculateOffsets = (
    anchorTo,
    height,
    width
) => ({
    // TODO: Grab bounding client rect from DOM node.
    left: -(width / 2),
    top: -(anchorTo === ANCHOR_TO.top ? height : height / 2)
})

const Marker = ({
    anchorTo,
    component,
    latitude,
    longitude,
    placeName,
    id,
    ...other
}) => {
    const theme = useTheme()
    const unitSpacing = theme.spacing(1)

    const offsets = useMemo(() => calculateOffsets(
        anchorTo, unitSpacing * 5, unitSpacing * 5
    ), [anchorTo, unitSpacing])

    return (
        <MarkerGl
            latitude={latitude}
            longitude={longitude}
            offsetLeft={offsets.left}
            offsetTop={offsets.top}
        >
            <MarkerContent
                component={component}
                placeName={placeName}
                id={id}
                {...other}
            />
        </MarkerGl>
    )
}

// TODO:
// Clean up this ill-conceived mess!

const MarkerEssentialPropTypes = {
    color: PropTypes.string,
    iconComponent: PropTypes.elementType.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    placeName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
}

const MarkerEssentialPropTypesExact = PropTypes.exact(
    MarkerEssentialPropTypes
)

const MarkerEssentialPropTypesArrayOf = PropTypes.arrayOf(
    MarkerEssentialPropTypesExact
)

Marker.propTypes = {
    ...MarkerContent.propTypes,
    ...MarkerEssentialPropTypes,
    anchorTo: PropTypes.string
}

Marker.defaultProps = {
    ...MarkerContent.defaultProps,
    anchorTo: ANCHOR_TO.top,
    color: null
}

export {
    Marker as default,
    ANCHOR_TO,
    MarkerEssentialPropTypes,
    MarkerEssentialPropTypesExact,
    MarkerEssentialPropTypesArrayOf
}
