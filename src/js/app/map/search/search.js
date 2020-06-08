export {
    default,
    search
} from '@map/search/searchSlice'

export { default as SEARCH_RESULT_TYPE } from '@map/search/enumSearchResultType'

export {
    default as geocodingResultIsDach
} from '@map/search/filterGeocodingResults'

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
