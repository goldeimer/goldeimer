import { createSelector } from 'reselect'

const selectSearchResult = (state) => (state.map.search.result.current)

const selectSearchResultHistory = (state) => (state.map.search.result.history)

const selectRecentSearchResults = (
    state,
    size = 5,
    offset = 0
) => createSelector(
    selectSearchResultHistory,
    (history) => history.slice(offset, offset + size)
)

export {
    selectSearchResult,
    selectSearchResultHistory,
    selectRecentSearchResults
}
