/// TODO:
/// Make taxonomies & terms dynamic.
/// Let (admin) users define terms on the backend side (once we have one).

import { combineReducers } from 'redux'

import {
    RESET_FILTER,
    RESET_SORT_ORDER_BY,
    RESET_SORT_ORDER,
    RESET_THEME,
    SET_SORT_ORDER_BY,
    SET_SORT_ORDER,
    SET_THEME,
    TOGGLE_FILTER_TERM
} from 'actions/mapActions'

import makeKeyedListItemToggleReducer from
    'reducers/makeKeyedListItemToggleReducer'

import { THEME } from 'config/theme'
import SORT_ORDER from 'enum/sortOrder'
import TAXONOMIES from 'enum/taxonomies'

const INITIAL_FILTERS = Object.fromEntries(TAXONOMIES.map(
    ({ taxonomyId, terms }) => ([
        taxonomyId,
        terms.map(({ termId }) => (termId))
    ])
))
const filterReducer = combineReducers(
    Object.fromEntries(
        TAXONOMIES.map(
            ({ taxonomyId }) => ([
                taxonomyId,
                makeKeyedListItemToggleReducer(
                    INITIAL_FILTERS[taxonomyId],
                    RESET_FILTER,
                    TOGGLE_FILTER_TERM,
                    taxonomyId
                )
            ])
        )
    )
)

const INITIAL_SORT_ORDER = SORT_ORDER.asc
const sortOrderReducer = (
    state = INITIAL_SORT_ORDER,
    action
) => {
    switch (action.type) {
    case SET_SORT_ORDER:
        return action.order

    case RESET_SORT_ORDER:
        return INITIAL_SORT_ORDER

    default:
        return state
    }
}

const INITIAL_SORT_ORDER_BY = 'name'
const sortOrderByReducer = (
    state = INITIAL_SORT_ORDER_BY,
    action
) => {
    switch (action.type) {
    case SET_SORT_ORDER_BY:
        return action.orderBy

    case RESET_SORT_ORDER_BY:
        return INITIAL_SORT_ORDER_BY

    default:
        return state
    }
}

const INITIAL_THEME = THEME.Goldeimer
const themeReducer = (
    state = INITIAL_THEME,
    action
) => {
    switch (action.type) {
    case SET_THEME:
        return action.theme in THEME.keys() ? action.theme : state

    case RESET_THEME:
        return INITIAL_THEME

    default:
        return state
    }
}

const settingsReducer = combineReducers({
    map: combineReducers({
        filter: filterReducer,
        sort: combineReducers({
            order: sortOrderReducer,
            orderBy: sortOrderByReducer
        })
    }),
    app: combineReducers({
        theme: themeReducer
    })
})

export default settingsReducer
