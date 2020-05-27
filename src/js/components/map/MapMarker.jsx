import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Marker } from 'react-map-gl'

import { useTheme } from '@material-ui/core/styles'

import MapMarkerContent from 'components/map/MapMarkerContent'

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

const MapMarker = ({
    anchorTo,
    component,
    latitude,
    longitude,
    placeName,
    uuid,
    ...other
}) => {
    const theme = useTheme()
    const unitSpacing = theme.spacing(1)

    const offsets = useMemo(() => calculateOffsets(
        anchorTo, unitSpacing * 5, unitSpacing * 5
    ), [anchorTo, unitSpacing])

    return (
        <Marker
            latitude={latitude}
            longitude={longitude}
            offsetLeft={offsets.left}
            offsetTop={offsets.top}
        >
            <MapMarkerContent
                component={component}
                placeName={placeName}
                uuid={uuid}
                {...other}
            />
        </Marker>
    )
}

// TODO:
// Clean up this ill-conceived mess!

const MapMarkerEssentialPropTypes = {
    color: PropTypes.string,
    iconComponent: PropTypes.elementType.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    placeName: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired
}

const MapMarkerEssentialPropTypesExact = PropTypes.exact(
    MapMarkerEssentialPropTypes
)

const MapMarkerEssentialPropTypesArrayOf = PropTypes.arrayOf(
    MapMarkerEssentialPropTypesExact
)

MapMarker.propTypes = {
    ...MapMarkerContent.propTypes,
    ...MapMarkerEssentialPropTypes,
    anchorTo: PropTypes.string
}

MapMarker.defaultProps = {
    ...MapMarkerContent.defaultProps,
    anchorTo: ANCHOR_TO.top,
    color: null
}

export {
    MapMarker as default,
    ANCHOR_TO,
    MapMarkerEssentialPropTypes,
    MapMarkerEssentialPropTypesExact,
    MapMarkerEssentialPropTypesArrayOf
}
