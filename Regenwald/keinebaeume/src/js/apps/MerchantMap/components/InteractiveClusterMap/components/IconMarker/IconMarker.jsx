import React from 'react'
import PropTypes from 'prop-types'
import { Marker } from 'react-map-gl'

import { useTheme } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Tooltip from '@material-ui/core/Tooltip'

const ANCHOR_TO = {
    center: 'center',
    top: 'top'
}

const calculateOffsets = (anchorTo, theme, withAvatar) => {
    const height = theme.spacing(withAvatar ? 5 : 3)
    const width = theme.spacing(withAvatar ? 5 : 3)

    return {
        left: -(width / 2),
        top: -(anchorTo === ANCHOR_TO.top ? height : height / 2)
    }
}

const IconMarker = ({
    anchorTo,
    iconComponent,
    latitude,
    longitude,
    placeName,
    withAvatar
}) => {
    const offsets = calculateOffsets(anchorTo, useTheme(), withAvatar)

    const renderIcon = () => (
        withAvatar
            ? (
                <Avatar>
                    {iconComponent}
                </Avatar>
            )
            : iconComponent
    )

    return (
        <Marker
            latitude={latitude}
            longitude={longitude}
            offsetLeft={offsets.left}
            offsetTop={offsets.top}
        >
            {placeName !== null && placeName.length > 0
                ? (
                    <Tooltip title={placeName}>
                        {renderIcon()}
                    </Tooltip>
                )
                : renderIcon()
            }
        </Marker>
    )
}

IconMarker.propTypes = {
    anchorTo: PropTypes.string,
    iconComponent: PropTypes.element.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    placeName: PropTypes.string,
    withAvatar: PropTypes.bool
}

IconMarker.defaultProps = {
    anchorTo: ANCHOR_TO.center,
    placeName: null,
    withAvatar: true
}

export {
    IconMarker as default,
    ANCHOR_TO
}
