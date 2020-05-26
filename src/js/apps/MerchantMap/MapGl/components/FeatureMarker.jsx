import React, { memo } from 'react'
import PropTypes from 'prop-types'

import { useTheme } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'

import DeliveryServiceIcon from '@material-ui/icons/LocalShipping'
import EcommerceIcon from '@material-ui/icons/Shop'
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation'
import RetailIcon from '@material-ui/icons/Store'

import InlineSvgIcon from 'components/InlineSvgIcon'
import MapMarker, { ANCHOR_TO } from 'components/MapMarker'
import wholesaleSvg from 'img/icons/wholesaleIcon.svg'

import {
    COLOR_PRIMARY_GOLDEIMER,
    COLOR_PRIMARY_VIVA_CON_AGUA
} from 'config/theme'
import { BRAND, MERCHANT_TYPE } from 'enum/taxonomies'

// TODO: Stub.
// Allow admins to set in the not yet existent backend.
const getColorSchemeByTaxonomyTerm = (term, theme) => {
    const makeScheme = (color, backgroundColor) => ({ color, backgroundColor })

    switch (term) {
    case BRAND.vca:
        return makeScheme(
            theme.palette.getContrastText(COLOR_PRIMARY_VIVA_CON_AGUA),
            COLOR_PRIMARY_VIVA_CON_AGUA
        )

    case BRAND.goldeimer:
        return makeScheme(
            theme.palette.getContrastText(COLOR_PRIMARY_GOLDEIMER),
            COLOR_PRIMARY_GOLDEIMER
        )

    default:
        return makeScheme(
            theme.palette.primary.contrastText,
            theme.palette.primary.main
        )
    }
}

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
        return <InlineSvgIcon svg={wholesaleSvg} />

    default:
        return <NotListedLocationIcon />
    }
}

const FeatureMarkerComponent = ({
    colorTaxonomyTerm,
    iconTaxonomyTerm
}) => (
    <Avatar
        style={getColorSchemeByTaxonomyTerm(colorTaxonomyTerm, useTheme())}
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
