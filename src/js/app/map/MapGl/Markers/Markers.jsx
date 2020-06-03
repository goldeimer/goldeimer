import React, { memo } from 'react'
import PropTypes from 'prop-types'

import {
    MarkerEssentialPropTypesArrayOf
} from '@map/MapGl/Markers/Marker'

const Markers = ({ component: Component, propsArray }) => propsArray.map(
    ({ id, ...other }) => (
        <Component key={id} id={id} {...other} />
    )
)

Markers.propTypes = {
    component: PropTypes.elementType.isRequired,
    propsArray: MarkerEssentialPropTypesArrayOf.isRequired
}

const MarkersMemoized = memo(Markers)

export {
    MarkersMemoized as default
}
