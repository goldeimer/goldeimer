import React from 'react'

import MarkerIcon from '@material-ui/icons/Room'

import IconMarker, { ANCHOR_TO } from '../IconMarker/IconMarker'

const ProximityMarker = (props) => (
    <IconMarker
        {...props}
        anchorTo={ANCHOR_TO.top}
        iconComponent={<MarkerIcon />}
        withAvatar={false}
    />
)

export default ProximityMarker
