const makeCombinedTaxonomyTermId = (taxonomyId, termId) => (
    `${taxonomyId}.${termId}`
)

const makeIdEnum = (terms) => Object.fromEntries(
    terms.map(
        (term) => ([term[0], term[0]])
    )
)

const makeTerm = ([termId, label], taxonomyId) => ({
    termId,
    taxonomyTermId: makeCombinedTaxonomyTermId(taxonomyId, termId),
    label
})

const makeTaxonomy = (taxonomyId, title, terms) => ({
    taxonomyId,
    title,
    terms: terms.map((term) => makeTerm(term, taxonomyId))
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

const merchantTypes = makeTaxonomy(
    'merchantTypes',
    'Kategorie',
    [
        ['retail', 'Einzelhandel'],
        ['wholesale', 'Großhandel'],
        ['delivery', 'Lieferservice'],
        ['online', 'Online Shop']
    ]
)
const MERCHANT_TYPE = makeIdEnum(merchantTypes.terms)

const TAXONOMIES = [brands, merchantTypes]

export {
    TAXONOMIES as default,
    BRAND,
    MERCHANT_TYPE
}
