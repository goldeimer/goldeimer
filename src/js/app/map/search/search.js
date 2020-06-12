export {
    default,
    search
} from '@map/search/searchSlice'

export { default as SEARCH_RESULT_TYPE } from '@map/search/enumSearchResultType'

export {
    geocodingResultIsDach,
    idNotInIds
} from '@map/search/filterGeocodingResults'

export { MIN_ACTIONABLE_QUERY_LENGTH } from '@map/search/searchConfig'

export {
    geocodingResultToSearchResult,
    geocodingResultsToSearchResults
} from '@map/search/transformSearchResults'

export {
    useGeocodingResults,
    useGeocodingSearchResults,
    useQueriedFeatureIds,
    useQueriedFeatureSearchResults,
    useQueriedFeatures,
    useQueriedSearchHistory,
    useQueriedSearchHistoryResults,
    useQuery,
    useSearchResult
} from '@map/search/useSearch'
