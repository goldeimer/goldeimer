import React, { memo } from 'react'
import PropTypes from 'prop-types'

import Marker from '@map/MapGl/Markers/Marker'

const Markers = memo(({ component: Component, propsArray }) => propsArray.map(
    ({ id, ...other }) => (
        <Component id={id} key={id} {...other} />
    )
))

Markers.propTypes = {
    component: PropTypes.elementType.isRequired,
    propsArray: PropTypes.arrayOf(
        PropTypes.shape(Marker.propTypes)
    ).isRequired
}

export {
    Markers as default
}
