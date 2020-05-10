/// TODO(Johannes):
/// Make taxonomies & terms dynamic, let (admin) users define terms on the
/// backend side (once we have one).

import { combineReducers } from 'redux'

import {
    RESET_FILTER_ENABLED_FOR_COMPONENTS,
    RESET_SELECTED_TERMS,
    RESET_SORT_KEY,
    RESET_SORT_ORDER,
    SET_SORT_KEY,
    SET_SORT_ORDER,
    TOGGLE_FILTERABLE_COMPONENT,
    TOGGLE_TERM
} from 'actions/merchantMapActions'

import makeKeyedListItemToggleReducer from
    'reducers/makeKeyedListItemToggleReducer'

import TAXONOMIES from './taxonomies'

const FILTERABLE_COMPONENT = {
    list: 'list',
    map: 'map'
}

const SORT_ORDER = {
    asc: 'asc',
    desc: 'desc'
}

const flattenEnum = (enumeration) => (
    Object.entries(enumeration).map(([key, value]) => value)
)

const makeInitialState = () => ({
    filter: {
        enabledForComponents: [
            flattenEnum(FILTERABLE_COMPONENT)
        ],
        selectedTerms: TAXONOMIES.map(
            ({ terms }) => (terms.map(({ taxonomyTermId }) => (taxonomyTermId)))
        ).flat()
    },
    sort: {
        key: 'TODO: DEFAULT SORT KEY import',
        order: SORT_ORDER.asc
    }
})

const INITIAL_STATE = makeInitialState()

const filterEnabledForComponentsReducer = makeKeyedListItemToggleReducer(
    INITIAL_STATE.filter.enabledForComponents,
    RESET_FILTER_ENABLED_FOR_COMPONENTS,
    TOGGLE_FILTERABLE_COMPONENT
)

const selectedFilterTermsReducer = makeKeyedListItemToggleReducer(
    INITIAL_STATE.filter.selectedTerms,
    RESET_SELECTED_TERMS,
    TOGGLE_TERM
)

const sortKeyReducer = (
    state = INITIAL_STATE.sort.key,
    action
) => {
    switch (action.type) {
    case SET_SORT_KEY:
        return action.key

    case RESET_SORT_KEY:
        return INITIAL_STATE.sort.key

    default:
        return state
    }
}

const sortOrderReducer = (
    state = INITIAL_STATE.sort.order,
    action
) => {
    switch (action.type) {
    case SET_SORT_ORDER:
        return action.order

    case RESET_SORT_ORDER:
        return INITIAL_STATE.sort.order

    default:
        return state
    }
}

const filterReducer = combineReducers({
    enabledForComponents: filterEnabledForComponentsReducer,
    selectedTerms: selectedFilterTermsReducer
})

const sortReducer = combineReducers({
    key: sortKeyReducer,
    order: sortOrderReducer
})

const settingsReducer = combineReducers({
    filter: filterReducer,
    sort: sortReducer
})

export default settingsReducer
