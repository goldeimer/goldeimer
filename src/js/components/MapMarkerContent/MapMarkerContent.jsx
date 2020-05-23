import React from 'react'
import PropTypes from 'prop-types'

import Avatar from '@material-ui/core/Avatar'
import Tooltip from '@material-ui/core/Tooltip'
import MarkerIcon from '@material-ui/icons/Room'

const MapMarkerContent = ({
    component: Component,
    placeName,
    withAvatar
}) => (
    <Tooltip title={placeName}>
        {withAvatar
            ? <Avatar><Component /></Avatar>
            : <Component />
        }
    </Tooltip>
)

MapMarkerContent.propTypes = {
    component: PropTypes.elementType,
    placeName: PropTypes.string.isRequired,
    withAvatar: PropTypes.bool
}

MapMarkerContent.defaultProps = {
    component: MarkerIcon,
    withAvatar: false
}

export default MapMarkerContent
