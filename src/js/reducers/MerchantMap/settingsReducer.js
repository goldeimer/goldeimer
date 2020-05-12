/// TODO:
/// Make taxonomies & terms dynamic.
/// Let (admin) users define terms on the backend side (once we have one).

import { combineReducers } from 'redux'

import {
    RESET_FILTER_ENABLED_FOR_COMPONENTS,
    RESET_SELECTED_TERMS,
    RESET_SORT_ORDER_BY,
    RESET_SORT_ORDER,
    SET_SORT_ORDER_BY,
    SET_SORT_ORDER,
    TOGGLE_FILTERABLE_COMPONENT,
    TOGGLE_TERM
} from 'actions/merchantMapActions'

import makeKeyedListItemToggleReducer from
    'reducers/makeKeyedListItemToggleReducer'

import SORT_ORDER from 'enum/sortOrder'
import TAXONOMIES from 'enum/taxonomies'

const FILTERABLE_COMPONENT = {
    list: 'list',
    map: 'map'
}

const flattenEnum = (enumeration) => (
    Object.entries(enumeration).map(([key, value]) => value)
)

const makeInitialState = () => ({
    filter: {
        enabledForComponents: [
            flattenEnum(FILTERABLE_COMPONENT)
        ],
        selectedTerms: Object.fromEntries(
            TAXONOMIES.map(
                ({ taxonomyId, terms }) => ([
                    taxonomyId,
                    terms.map(({ termId }) => (termId))
                ])
            )
        )
    },
    sort: {
        orderBy: 'name', // TODO: import
        order: SORT_ORDER.asc
    }
})

const INITIAL_STATE = makeInitialState()

const filterEnabledForComponentsReducer = makeKeyedListItemToggleReducer(
    INITIAL_STATE.filter.enabledForComponents,
    RESET_FILTER_ENABLED_FOR_COMPONENTS,
    TOGGLE_FILTERABLE_COMPONENT
)

const selectedTermsReducer = combineReducers(
    Object.fromEntries(
        TAXONOMIES.map(
            ({ taxonomyId }) => ([
                taxonomyId,
                makeKeyedListItemToggleReducer(
                    INITIAL_STATE.filter.selectedTerms[taxonomyId],
                    RESET_SELECTED_TERMS,
                    TOGGLE_TERM,
                    taxonomyId
                )
            ])
        )
    )
)

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

const sortOrderByReducer = (
    state = INITIAL_STATE.sort.orderBy,
    action
) => {
    switch (action.type) {
    case SET_SORT_ORDER_BY:
        return action.orderBy

    case RESET_SORT_ORDER_BY:
        return INITIAL_STATE.sort.orderBy

    default:
        return state
    }
}

const filterReducer = combineReducers({
    enabledForComponents: filterEnabledForComponentsReducer,
    selectedTerms: selectedTermsReducer
})

const sortReducer = combineReducers({
    order: sortOrderReducer,
    orderBy: sortOrderByReducer
})

const settingsReducer = combineReducers({
    filter: filterReducer,
    sort: sortReducer
})

export default settingsReducer
