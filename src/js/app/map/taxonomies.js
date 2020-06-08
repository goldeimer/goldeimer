// TODO: The entire file is a stub.
// Allow admins to set these in the not yet existent backend.

import DeliveryServiceIcon from '@material-ui/icons/LocalShipping'
import EcommerceIcon from '@material-ui/icons/Shop'
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation'
import RetailIcon from '@material-ui/icons/Store'

import GoldeimerIcon from '@map/icons/brands/GoldeimerIcon'
import VivaConAguaIcon from '@map/icons/brands/VivaConAguaIcon'
import WholesaleIcon from '@map/icons/merchant-types/WholesaleIcon'

import {
    COLOR_PRIMARY_GOLDEIMER,
    COLOR_PRIMARY_VIVA_CON_AGUA
} from '@config/theme'

const VISUALIZED_TAXONOMY = {
    color: 'brands',
    icon: 'merchantTypes'
}

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

const makeTerm = ([termId, termName, iconComponent = null, props = {}]) => ({
    termId,
    termName,
    iconComponent,
    ...props
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
        [
            'goldeimer',
            'Goldeimer',
            GoldeimerIcon,
            { color: COLOR_PRIMARY_GOLDEIMER }
        ],
        [
            'vca',
            'Viva con Agua',
            VivaConAguaIcon,
            { color: COLOR_PRIMARY_VIVA_CON_AGUA }
        ]
    ]
)
const BRAND = makeIdEnum(brands.terms)
const BRAND_NAME = makeNameEnum(brands.terms)

const merchantTypes = makeTaxonomy(
    'merchantTypes',
    'Kategorie',
    [
        ['retail', 'Einzelhandel', RetailIcon],
        ['wholesale', 'Großhandel', WholesaleIcon],
        ['delivery', 'Lieferservice', DeliveryServiceIcon],
        ['ecommerce', 'Online Shop', EcommerceIcon]
    ]
)
const MERCHANT_TYPE = makeIdEnum(merchantTypes.terms)
const MERCHANT_TYPE_NAME = makeNameEnum(merchantTypes.terms)

const TAXONOMY_LOOKUP = {
    brands,
    merchantTypes
}

const TAXONOMIES = Object.entries(TAXONOMY_LOOKUP).map(([, t]) => t)

const getPropByTaxonomyTermId = (
    prop,
    taxonomyId,
    termId,
    defaultValue = null
) => {
    if (!(taxonomyId in TAXONOMY_LOOKUP)) {
        return defaultValue
    }

    const { terms } = TAXONOMY_LOOKUP[taxonomyId]
    const term = terms.find((t) => t.termId === termId)

    return term ? term[prop] : defaultValue
}

const getIconComponentByTaxonomyTermId = (termId) => getPropByTaxonomyTermId(
    'iconComponent',
    VISUALIZED_TAXONOMY.icon,
    termId,
    NotListedLocationIcon
)

const getColorByTaxonomyTermId = (termId) => getPropByTaxonomyTermId(
    'color',
    VISUALIZED_TAXONOMY.color,
    termId
)

export {
    TAXONOMIES as default,
    BRAND,
    BRAND_NAME,
    MERCHANT_TYPE,
    MERCHANT_TYPE_NAME,
    VISUALIZED_TAXONOMY,
    getColorByTaxonomyTermId,
    getIconComponentByTaxonomyTermId
}
