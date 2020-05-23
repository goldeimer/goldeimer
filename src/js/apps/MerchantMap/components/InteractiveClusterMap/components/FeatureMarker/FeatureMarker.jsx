import React from 'react'
import PropTypes from 'prop-types'

import StorefrontIcon from '@material-ui/icons/Storefront'

import MapMarker, { ANCHOR_TO } from 'components/MapMarker/MapMarker'

const DEFAULT_FEATURE_ICON_COMPONENT = StorefrontIcon // TODO

const getFeatureIconComponent = (taxonomyTerm = '') => {
    switch (taxonomyTerm) {
    default:
        return DEFAULT_FEATURE_ICON_COMPONENT
    }
}

const FeatureMarker = ({ component, ...props }) => (
    <MapMarker
        {...props}
        anchorTo={ANCHOR_TO.center}
        component={component || getFeatureIconComponent()}
        withAvatar
    />
)

FeatureMarker.propTypes = {
    ...MapMarker.propTypes,
    component: PropTypes.elementType
}

FeatureMarker.defaultProps = {
    ...MapMarker.defaultProps,
    component: null
}

export default FeatureMarker
