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
    dynamicComponentProps,
    keyPrefix,
    staticComponentProps
}) => dynamicComponentProps.map(
    ({ id, ...other }) => (
        <Component
            {...staticComponentProps}
            {...other}
            contextInfo={contextInfo}
            id={id}
            key={`${keyPrefix}-${id}`}
        />
    )
))

Markers.propTypes = {
    component: PropTypes.elementType.isRequired,
    contextInfo: PropTypeContextInfo,
    dynamicComponentProps: PropTypes.arrayOf(
        PropTypes.shape(
            Marker.propTypes
        )
    ).isRequired,
    keyPrefix: PropTypes.string,
    staticComponentProps: PropTypes.shape({
        domain: PropTypes.arrayOf(PropTypes.number)
    })
}

Markers.defaultProps = {
    contextInfo: ({ id, type } = DEFAULT_CONTEXT) => ({ id, type })(),
    keyPrefix: 'marker',
    staticComponentProps: {}
}

export {
    Markers as default
}
