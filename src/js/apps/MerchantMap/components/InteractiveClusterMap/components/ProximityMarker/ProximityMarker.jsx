import React from 'react'

import MarkerIcon from '@material-ui/icons/Room'

import MapMarker, { ANCHOR_TO } from 'components/MapMarker/MapMarker'

const ProximityMarker = (props) => (
    <MapMarker
        {...props}
        anchorTo={ANCHOR_TO.top}
        component={MarkerIcon}
        withAvatar={false}
    />
)

export default ProximityMarker
