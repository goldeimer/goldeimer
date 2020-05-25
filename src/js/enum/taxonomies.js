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

export {
    TAXONOMIES as default,
    BRAND,
    BRAND_NAME,
    MERCHANT_TYPE,
    MERCHANT_TYPE_NAME
}
