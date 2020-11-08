export {
    default,
    search
} from '@map/search/searchSlice'

export {
    geocodingResultIsDach,
    idNotInIds
} from '@map/search/filterGeocodingResults'

export {
    ADDITIONAL_THROTTLE_THRESHOLD_QUERY_LENGTH,
    MIN_ACTIONABLE_QUERY_LENGTH
} from '@map/search/searchConfig'

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
