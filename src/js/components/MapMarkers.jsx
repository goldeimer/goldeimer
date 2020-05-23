import React, { memo } from 'react'
import PropTypes from 'prop-types'

import {
    MapMarkerEssentialPropTypesArrayOf
} from 'components/MapMarker'

const MapMarkers = ({ component, propsArray }) => {
    const MarkerComponent = component

    return propsArray.map(
        ({ uuid, ...props }) => (
            <MarkerComponent key={uuid} uuid={uuid} {...props} />
        )
    )
}

MapMarkers.propTypes = {
    component: PropTypes.elementType.isRequired,
    propsArray: MapMarkerEssentialPropTypesArrayOf.isRequired
}

const MapMarkersMemoized = memo(MapMarkers)

export {
    MapMarkersMemoized as default,
    MapMarkers
}
