/// TODO(Johannes):
/// Make dynamic, define on the backend side (once we have one).

/// ---------------------------------- util -----------------------------------

const makeTaxonomy = (id, title, items) => ({
    id,
    title,
    items
})

const makeItem = (id, label) => ({
    id,
    label,
    selected: true
})

const makeIdEnum = (items) => Object.fromEntries(
    items.map(
        ({ id }) => ([id, id])
    )
)

const makeKey = (taxonomyId, itemId) => (`${taxonomyId}.${itemId}`)

const makeDefaultState = (taxonomies) => taxonomies.map(
    ({ id: taxonomyId, items }) => (
        items.map(
            ({ id: itemId }) => (makeKey(taxonomyId, itemId))
        )
    )
).flat()

/// ---------------------------- filter dimensions ----------------------------

const brands = makeTaxonomy(
    'brands',
    'Marken',
    [
        makeItem('goldeimer', 'Goldeimer'),
        makeItem('vca', 'Viva con Agua')
    ]
)
const BRAND = makeIdEnum(brands.items)

const merchantTypes = makeTaxonomy(
    'merchantTypes',
    'Kategorie',
    [
        makeItem('retail', 'Einzelhandel'),
        makeItem('wholesale', 'Großhandel'),
        makeItem('delivery', 'Lieferservice'),
        makeItem('online', 'Online Shop')
    ]
)
const MERCHANT_TYPE = makeIdEnum(merchantTypes.items)

const TAXONOMIES = [brands, merchantTypes]

const DEFAULT_STATE = makeDefaultState(TAXONOMIES)

const selectedFilterItems = (
    state = DEFAULT_STATE,
    action
) => {
    switch (action.type) {
    case 'TOGGLE_FILTER_ITEM': {
        const currentIndex = state.indexOf(action.key)
        const newSelected = [...state]

        if (currentIndex === -1) {
            newSelected.push(action.key)
        } else {
            newSelected.splice(currentIndex, 1)
        }

        return newSelected
    }

    case 'RESET_FILTER_ITEMS':
        return DEFAULT_STATE

    default:
        return state
    }
}

export {
    selectedFilterItems as default,
    makeKey,
    TAXONOMIES,
    BRAND,
    MERCHANT_TYPE
}
