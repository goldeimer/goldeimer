import React, { memo } from 'react'
import PropTypes from 'prop-types'

import {
    MarkerEssentialPropTypesArrayOf
} from '@map/MapGl/Markers/Marker'

const Markers = memo(({ component: Component, propsArray }) => propsArray.map(
    ({ id, ...other }) => (
        <Component id={id} key={id} {...other} />
    )
))

Markers.propTypes = {
    component: PropTypes.elementType.isRequired,
    propsArray: MarkerEssentialPropTypesArrayOf.isRequired
}

export {
    Markers as default
}
