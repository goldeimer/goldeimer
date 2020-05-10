const makeTaxonomy = (id, title, terms) => ({
    id,
    title,
    terms
})

const makeTerm = (id, label) => ({
    id,
    label,
    selected: true
})

const makeCombinedTaxonomyTermId = (taxonomyId, termId) => (
    `${taxonomyId}.${termId}`
)

const makeIdEnum = (terms) => Object.fromEntries(
    terms.map(
        ({ id }) => ([id, id])
    )
)

const brands = makeTaxonomy(
    'brands',
    'Marken',
    [
        makeTerm('goldeimer', 'Goldeimer'),
        makeTerm('vca', 'Viva con Agua')
    ]
)
const BRAND = makeIdEnum(brands.terms)

const merchantTypes = makeTaxonomy(
    'merchantTypes',
    'Kategorie',
    [
        makeTerm('retail', 'Einzelhandel'),
        makeTerm('wholesale', 'Großhandel'),
        makeTerm('delivery', 'Lieferservice'),
        makeTerm('online', 'Online Shop')
    ]
)
const MERCHANT_TYPE = makeIdEnum(merchantTypes.terms)

const TAXONOMIES = [brands, merchantTypes]

export {
    TAXONOMIES as default,
    makeCombinedTaxonomyTermId,
    BRAND,
    MERCHANT_TYPE
}
