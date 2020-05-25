import React, { memo } from 'react'
import PropTypes from 'prop-types'

import Avatar from '@material-ui/core/Avatar'
// import SvgIcon from '@material-ui/core/SvgIcon'

import DeliveryServiceIcon from '@material-ui/icons/LocalShipping'
import EcommerceIcon from '@material-ui/icons/Shop'
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation'
import RetailIcon from '@material-ui/icons/Store'

import MapMarker, { ANCHOR_TO } from 'components/MapMarker'
// import wholesaleSvg from 'img/icons/wholesaleIcon.svg'

import {
    COLOR_PRIMARY_GOLDEIMER,
    COLOR_PRIMARY_VIVA_CON_AGUA
} from 'config/theme'
import { BRAND, MERCHANT_TYPE } from 'enum/taxonomies'

// TODO: Stub.
// Allow admins to set in the not yet existent backend.
const getColorByTaxonomyTerm = (term, theme = null) => {
    switch (term) {
    case BRAND.vca:
        return COLOR_PRIMARY_VIVA_CON_AGUA

    case BRAND.goldeimer:
        return COLOR_PRIMARY_GOLDEIMER

    default:
        return (
            theme
                ? theme.palette.primary.main
                : COLOR_PRIMARY_GOLDEIMER
        )
    }
}

const WholesaleIcon = (props) => (
    <NotListedLocationIcon />
//    <SvgIcon {...props}>
//        {wholesaleSvg}
//    </SvgIcon>
)

// TODO: Stub.
// Allow admins to set in the not yet existent backend.
const getIconByTaxonomyTerm = (term) => {
    switch (term) {
    case MERCHANT_TYPE.delivery:
        return <DeliveryServiceIcon />

    case MERCHANT_TYPE.ecommerce:
        return <EcommerceIcon />

    case MERCHANT_TYPE.retail:
        return <RetailIcon />

    case MERCHANT_TYPE.wholesale:
        return <WholesaleIcon />

    default:
        return <NotListedLocationIcon />
    }
}

const FeatureMarkerComponent = ({
    colorTaxonomyTerm,
    iconTaxonomyTerm
}) => (
    <Avatar
        style={{ backgroundColor: getColorByTaxonomyTerm(colorTaxonomyTerm) }}
    >
        {getIconByTaxonomyTerm(iconTaxonomyTerm)}
    </Avatar>
)

FeatureMarkerComponent.propTypes = {
    colorTaxonomyTerm: PropTypes.string,
    iconTaxonomyTerm: PropTypes.string
}

FeatureMarkerComponent.defaultProps = {
    colorTaxonomyTerm: null,
    iconTaxonomyTerm: null
}

const FeatureMarkerComponentMemoized = memo(FeatureMarkerComponent)

const FeatureMarker = ({ component, ...other }) => (
    <MapMarker
        {...other}
        anchorTo={ANCHOR_TO.center}
        component={component || FeatureMarkerComponentMemoized}
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
