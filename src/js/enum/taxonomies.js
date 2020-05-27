// TODO: The entire file is a stub.
// Allow admins to set these in the not yet existent backend.

import DeliveryServiceIcon from '@material-ui/icons/LocalShipping'
import EcommerceIcon from '@material-ui/icons/Shop'
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation'
import RetailIcon from '@material-ui/icons/Store'

import WholeSaleIcon from 'components/icons/WholeSaleIcon'

import {
    COLOR_PRIMARY_GOLDEIMER,
    COLOR_PRIMARY_VIVA_CON_AGUA
} from 'config/theme'

const makeIdEnum = (terms) => Object.fromEntries(
    terms.map(
        ({ termId }) => ([termId, termId])
    )
)

const makeNameEnum = (terms) => Object.fromEntries(
    terms.map(
        ({ termId, termName }) => ([termId, termName])
    )
)

const makeTerm = ([termId, termName]) => ({
    termId,
    termName
})

const makeTaxonomy = (taxonomyId, taxonomyName, terms) => ({
    taxonomyId,
    taxonomyName,
    terms: terms.map((term) => makeTerm(term))
})

const brands = makeTaxonomy(
    'brands',
    'Marken',
    [
        ['goldeimer', 'Goldeimer'],
        ['vca', 'Viva con Agua']
    ]
)
const BRAND = makeIdEnum(brands.terms)
const BRAND_NAME = makeNameEnum(brands.terms)

const merchantTypes = makeTaxonomy(
    'merchantTypes',
    'Kategorie',
    [
        ['retail', 'Einzelhandel'],
        ['wholesale', 'Großhandel'],
        ['delivery', 'Lieferservice'],
        ['ecommerce', 'Online Shop']
    ]
)
const MERCHANT_TYPE = makeIdEnum(merchantTypes.terms)
const MERCHANT_TYPE_NAME = makeNameEnum(merchantTypes.terms)

const TAXONOMIES = [brands, merchantTypes]

const getIconComponentByTaxonomyTerm = (term) => {
    switch (term) {
    case MERCHANT_TYPE.delivery:
        return DeliveryServiceIcon

    case MERCHANT_TYPE.ecommerce:
        return EcommerceIcon

    case MERCHANT_TYPE.retail:
        return RetailIcon

    case MERCHANT_TYPE.wholesale:
        return WholeSaleIcon

    default:
        return NotListedLocationIcon
    }
}

const getColorByTaxonomyTerm = (term) => {
    switch (term) {
    case BRAND.vca:
        return COLOR_PRIMARY_VIVA_CON_AGUA

    case BRAND.goldeimer:
        return COLOR_PRIMARY_GOLDEIMER

    default:
        return null
    }
}

export {
    TAXONOMIES as default,
    BRAND,
    BRAND_NAME,
    MERCHANT_TYPE,
    MERCHANT_TYPE_NAME,
    getColorByTaxonomyTerm,
    getIconComponentByTaxonomyTerm
}
