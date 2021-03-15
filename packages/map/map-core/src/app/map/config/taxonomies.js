// TODO: The entire file is a stub.
// Allow admins to set these in the not yet existent backend.

import getTermIcon
    from './getTermIcon'

import {
    COLOR_PRIMARY_GOLDEIMER,
    COLOR_PRIMARY_VIVA_CON_AGUA
} from '../../../config/theme'

const COLOR_FALLBACK = {
    main: 'rgb(127, 127, 127)',
    light: 'rgb(95, 95, 95)',
    dark: 'rgb(159, 159, 159)',
    contrastText: 'rgb(0, 0, 0)'
}

const VisualizedTaxonomy = {
    color: 'brands',
    icon: 'merchantTypes',
    primary: 'merchantTypes',
    secondary: 'brands'
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

const makeTerm = ([
    termId,
    termName,
    iconId = null,
    color = COLOR_FALLBACK
]) => ({
    termId,
    termName,
    iconId,
    color
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
            'GoldeimerIcon',
            COLOR_PRIMARY_GOLDEIMER
        ],
        [
            'vca',
            'Viva con Agua',
            'VivaConAguaIcon',
            COLOR_PRIMARY_VIVA_CON_AGUA
        ]
    ]
)
const Brand = makeIdEnum(brands.terms)
const BrandName = makeNameEnum(brands.terms)

const merchantTypes = makeTaxonomy(
    'merchantTypes',
    'Kategorie',
    [
        ['retail', 'Einzelhandel', 'RetailIcon'],
        ['wholesale', 'Großhandel', 'WholesaleIcon'],
        ['delivery', 'Lieferservice', 'DeliveryServiceIcon'],
        ['ecommerce', 'Online Shop', 'EcommerceIcon']
    ]
)
const MerchantType = makeIdEnum(merchantTypes.terms)
const MerchantTypeName = makeNameEnum(merchantTypes.terms)

const TAXONOMY_LOOKUP = {
    brands,
    merchantTypes
}

const TAXONOMIES = Object.entries(TAXONOMY_LOOKUP).map(([, t]) => t)

const getPropByTermId = (
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

const getColorByTermId = (
    termId,
    taxonomyId = VisualizedTaxonomy.secondary
) => getPropByTermId(
    'color',
    taxonomyId,
    termId

)

const getIconComponentByTermId = (
    termId,
    taxonomyId = VisualizedTaxonomy.primary
) => getTermIcon(
    getPropByTermId(
        'iconId',
        taxonomyId,
        termId
    )
)

const getTermNameByTaxonomyIdAndTermId = (
    taxonomyId,
    termId,
    defeaultTermName = 'Eintrag'
) => getPropByTermId(
    'termName',
    taxonomyId,
    termId,
    defeaultTermName
)

const getColorAndIconComponent = (colorTermId, iconTermId) => ({
    color: getColorByTermId(colorTermId),
    iconComponent: getIconComponentByTermId(iconTermId)
})

const getFullTaxonomyVisualization = ({
    defaultTermName = 'Eintrag',
    taxonomyId,
    termId
}) => ({
    color: getColorByTermId(termId, taxonomyId),
    iconComponent: getIconComponentByTermId(termId, taxonomyId),
    termId,
    termName: getTermNameByTaxonomyIdAndTermId(
        taxonomyId,
        termId,
        defaultTermName
    )
})

const getPrimaryTaxonomy = () => merchantTypes
const getSecondaryTaxonomy = () => brands

export {
    TAXONOMIES as default,
    Brand,
    BrandName,
    COLOR_FALLBACK,
    MerchantType,
    MerchantTypeName,
    VisualizedTaxonomy,
    getColorAndIconComponent,
    getColorByTermId,
    getFullTaxonomyVisualization,
    getIconComponentByTermId,
    getPrimaryTaxonomy,
    getSecondaryTaxonomy,
    getTermIcon,
    getTermNameByTaxonomyIdAndTermId
}
