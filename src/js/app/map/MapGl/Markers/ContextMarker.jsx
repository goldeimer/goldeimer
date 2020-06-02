import React from 'react'

import MarkerIcon from '@material-ui/icons/Room'

import Marker, { ANCHOR_TO } from '@map/MapGl/Markers/Marker'

const ContextMarker = (props) => (
    <Marker
        {...props}
        anchorTo={ANCHOR_TO.top}
        component={MarkerIcon}
    />
)

export default ContextMarker
