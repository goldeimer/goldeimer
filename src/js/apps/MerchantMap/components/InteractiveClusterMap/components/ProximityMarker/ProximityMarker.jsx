import React from 'react'
import PropTypes from 'prop-types'
import { Marker } from 'react-map-gl'

import MarkerIcon from '@material-ui/icons/Room'
import Tooltip from '@material-ui/core/Tooltip'

const ProximityMarker = ({
    latitude,
    longitude,
    placeName
}) => (
    <Marker
        latitude={latitude}
        longitude={longitude}
    >
        {placeName !== null && placeName.length > 0
            ? (
                <Tooltip title={placeName}>
                    <MarkerIcon />
                </Tooltip>
            )
            : <MarkerIcon />
        }
    </Marker>
)

ProximityMarker.propTypes = {
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    placeName: PropTypes.string
}

ProximityMarker.defaultProps = {
    placeName: null
}

export default ProximityMarker
