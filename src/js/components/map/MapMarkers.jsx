import React, { memo } from 'react'
import PropTypes from 'prop-types'

import {
    MapMarkerEssentialPropTypesArrayOf
} from 'components/map/MapMarker'

const MapMarkers = ({ component: Component, propsArray }) => propsArray.map(
    ({ id, ...other }) => (
        <Component key={id} id={id} {...other} />
    )
)

MapMarkers.propTypes = {
    component: PropTypes.elementType.isRequired,
    propsArray: MapMarkerEssentialPropTypesArrayOf.isRequired
}

const MapMarkersMemoized = memo(MapMarkers)

export {
    MapMarkersMemoized as default,
    MapMarkers
}
