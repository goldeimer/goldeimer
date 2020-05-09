/// TODO(Johannes):
/// Make taxonomies & terms dynamic, let (admin) users define terms on the
/// backend side (once we have one).

import { combineReducers } from 'redux'

import {
    FILTER_SELECTED_TERMS_RESET,
    FILTER_SELECTED_TERMS_TOGGLE_TERM
} from 'actions/merchantMapActions'

/// ---------------------------------- util -----------------------------------

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

const makeIdEnum = (terms) => Object.fromEntries(
    terms.map(
        ({ id }) => ([id, id])
    )
)

const makeKey = (taxonomyId, termId) => (`${taxonomyId}.${termId}`)

const makeInitialState = (taxonomies) => ({
    selectedTerms: taxonomies.map(
        ({ id: taxonomyId, terms }) => (
            terms.map(
                ({ id: termId }) => (makeKey(taxonomyId, termId))
            )
        )
    ).flat()
})

/// ---------------------------- filter dimensions ----------------------------

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

const INITIAL_STATE = makeInitialState(TAXONOMIES)

const selectedTermsReducer = (
    state = INITIAL_STATE.selectedTerms,
    action
) => {
    switch (action.type) {
    case FILTER_SELECTED_TERMS_TOGGLE_TERM: {
        const thisTermIndex = state.indexOf(action.key)
        const newSelectedTerms = [...state]

        if (thisTermIndex === -1) {
            newSelectedTerms.push(action.key)
        } else {
            newSelectedTerms.splice(thisTermIndex, 1)
        }

        return newSelectedTerms
    }

    case FILTER_SELECTED_TERMS_RESET:
        return INITIAL_STATE

    default:
        return state
    }
}

const filterReducer = combineReducers({
    selectedTerms: selectedTermsReducer
})

export {
    filterReducer as default,
    makeKey,
    TAXONOMIES,
    BRAND,
    MERCHANT_TYPE
}
