import React from 'react'

import MarkerIcon from '@material-ui/icons/Room'

import MapMarker, { ANCHOR_TO } from 'components/map/MapMarker'

const ContextMarker = (props) => (
    <MapMarker
        {...props}
        anchorTo={ANCHOR_TO.top}
        component={MarkerIcon}
    />
)

export default ContextMarker
