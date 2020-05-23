import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Marker } from 'react-map-gl'

import { useTheme } from '@material-ui/core/styles'

import MapMarkerContent from 'components/MapMarkerContent/MapMarkerContent'

const ANCHOR_TO = {
    center: 'center',
    top: 'top'
}

const calculateOffsets = (anchorTo, unitSpacing, withAvatar) => {
    const height = unitSpacing * (withAvatar ? 5 : 3)
    const width = unitSpacing * (withAvatar ? 5 : 3)

    return {
        left: -(width / 2),
        top: -(anchorTo === ANCHOR_TO.top ? height : height / 2)
    }
}

const MapMarker = ({
    anchorTo,
    component,
    latitude,
    longitude,
    placeName,
    uuid,
    withAvatar
}) => {
    const theme = useTheme()
    const unitSpacing = theme.spacing(1)

    const offsets = useMemo(() => calculateOffsets(
        anchorTo, unitSpacing, withAvatar
    ), [anchorTo, unitSpacing, withAvatar])

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
                withAvatar={withAvatar}
            />
        </Marker>
    )
}

const MapMarkerEssentialPropTypes = {
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
    anchorTo: ANCHOR_TO.top
}

const transformGeoJsonFeatureToEssentialMarkerProps = ({
    geometry,
    properties
}) => {
    const { coordinates } = geometry

    return {
        latitude: coordinates[1],
        longitude: coordinates[0],
        placeName: properties.name,
        uuid: properties.uuid
    }
}

export {
    MapMarker as default,
    ANCHOR_TO,
    MapMarkerEssentialPropTypes,
    MapMarkerEssentialPropTypesExact,
    MapMarkerEssentialPropTypesArrayOf,
    transformGeoJsonFeatureToEssentialMarkerProps
}
