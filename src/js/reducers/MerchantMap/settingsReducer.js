/// TODO(Johannes):
/// Make taxonomies & terms dynamic, let (admin) users define terms on the
/// backend side (once we have one).

import { combineReducers } from 'redux'

import {
    RESET_SELECTED_TERMS,
    TOGGLE_TERM
} from 'actions/merchantMapActions'

import TAXONOMIES, { makeCombinedTaxonomyTermId } from './taxonomies'

/// ---------------------------------- util -----------------------------------

const makeInitialState = (taxonomies) => ({
    selectedTerms: taxonomies.map(
        ({ id: taxonomyId, terms }) => (
            terms.map(
                ({ id: termId }) => (
                    makeCombinedTaxonomyTermId(taxonomyId, termId)
                )
            )
        )
    ).flat()
})

/// ---------------------------- filter dimensions ----------------------------

const INITIAL_STATE = makeInitialState(TAXONOMIES)

const selectedTermsReducer = (
    state = INITIAL_STATE.selectedTerms,
    action
) => {
    switch (action.type) {
    case TOGGLE_TERM: {
        const thisTermIndex = state.indexOf(action.key)
        const newSelectedTerms = [...state]

        if (thisTermIndex === -1) {
            newSelectedTerms.push(action.key)
        } else {
            newSelectedTerms.splice(thisTermIndex, 1)
        }

        return newSelectedTerms
    }

    case RESET_SELECTED_TERMS:
        return INITIAL_STATE.selectedTerms

    default:
        return state
    }
}

const settingsReducer = combineReducers({
    selectedTerms: selectedTermsReducer
})

export default settingsReducer
