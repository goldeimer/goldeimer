import React, { memo } from 'react'
import PropTypes from 'prop-types'

import {
    DEFAULT_CONTEXT,
    PropTypeContextInfo
} from '@map/context'

import Marker from '@map/MapGl/Markers/Marker'

const Markers = memo(({
    component: Component,
    contextInfo,
    markerProps
}) => markerProps.map(
    ({ id, ...other }) => (
        <Component
            contextInfo={contextInfo}
            id={id}
            key={id}
            {...other}
        />
    )
))

Markers.propTypes = {
    component: PropTypes.elementType.isRequired,
    contextInfo: PropTypeContextInfo,
    markerProps: PropTypes.arrayOf(
        PropTypes.shape(Marker.propTypes)
    ).isRequired
}

Markers.defaultProps = {
    contextInfo: ({ id, type } = DEFAULT_CONTEXT) => ({ id, type })()
}

export {
    Markers as default
}
