import { createSelector } from 'reselect'
import { createCachedSelector, FifoMapCache } from 're-reselect'

import { getSearchableSourceFeatures } from '../feature/selectFeatures'

import { MIN_ACTIONABLE_QUERY_LENGTH } from './searchConfig'

const selectGeocodingResults = (state) => state.map.search.geocoding.results
const selectQuery = (state) => state.map.search.query
const selectSearchHistory = (state) => state.map.search.result.history
const selectSearchResult = (state) => state.map.search.result.current

// TODO: cached selector?
const getRecentSearchHistory = createSelector(
    selectSearchHistory,
    (history) => (size = 5, offset = 0) => history.slice(offset, offset + size)
)

const queryFeatureIds = createSelector(
    getSearchableSourceFeatures,
    selectQuery,
    (features, query) => {
        if (query.length < MIN_ACTIONABLE_QUERY_LENGTH) {
            return []
        }

        return features.reduce((acc, { id, terms }) => {
            if (terms.some((term) => term.includes(query))) {
                return [...acc, id]
            }

            return acc
        }, [])
    }
)

// TODO:
// - cached selector?
// - pass maxLength, early break from filter iteration?
const querySearchHistory = createCachedSelector(
    selectSearchHistory,
    selectQuery,
    (history, query) => {
        if (query.length < MIN_ACTIONABLE_QUERY_LENGTH) {
            return []
        }

        return history.filter(
            (entry, index, newArray) => (
                entry.result.placeName.includes(query)
                && newArray.findIndex(
                    (element) => (
                        element.result.placeName === entry.result.placeName
                    )
                ) === index
            )
        )
    }
)({
    keySelector: (history, query) => (
        `${query}:${history.length}`
    ),
    cacheObject: new FifoMapCache({ cacheSize: 20 })
})

export {
    getRecentSearchHistory,
    queryFeatureIds,
    querySearchHistory,
    selectGeocodingResults,
    selectQuery,
    selectSearchResult,
    selectSearchHistory
}
