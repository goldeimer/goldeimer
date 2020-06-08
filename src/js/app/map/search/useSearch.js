import { useSelector } from 'react-redux'

import { sortObjects, SORT_ORDER } from '@lib/util/array'
import { identity, yes } from '@lib/util/noop'

import { FEATURE_FORMAT, useFeatures } from '@map/features'

import {
    queryFeatureIds,
    querySearchHistory,
    selectGeocodingResults,
    selectQuery,
    selectSearchResult
} from '@map/search/selectSearch'

import {
    geocodingResultsToSearchResults,
    historyEntriesToSearchResults
} from '@map/search/transformSearchResults'

const useQuery = () => useSelector(selectQuery)

// TODO:
// maxLength vs. length, offset ((optional) proper pagination)
// --> useAbstraction?

const useGeocodingResults = ({
    condition = yes,
    maxLength = null,
    transform = identity
}) => {
    const results = useSelector(selectGeocodingResults)

    if (results.features) {
        const sorted = sortObjects(
            results.features.filter(condition),
            'relevance',
            SORT_ORDER.desc
        )

        const features = maxLength ? sorted.splice(0, maxLength) : sorted

        return transform(features)
    }

    return []
}

const useGeocodingSearchResults = ({ condition = yes, maxLength = null }) => (
    useGeocodingResults({
        condition,
        maxLength,
        transform: geocodingResultsToSearchResults
    })
)

const useQueriedFeatureIds = () => useSelector(queryFeatureIds)

const useQueriedFeatures = ({
    format = FEATURE_FORMAT.geojson,
    maxLength = null
}) => {
    const ids = useQueriedFeatureIds()
    const splicedIds = maxLength ? ids.splice(0, maxLength) : ids

    return useFeatures(splicedIds, format)
}

const useQueriedFeatureSearchResults = ({ maxLength = null }) => (
    useQueriedFeatures({
        format: FEATURE_FORMAT.searchResult,
        maxLength
    })
)

const useQueriedSearchHistory = ({
    maxLength = null,
    transform = identity
}) => {
    const historyEntries = useSelector(querySearchHistory)

    if (!maxLength) {
        return transform(historyEntries)
    }

    return transform(historyEntries.splice(0, maxLength))
}

const useQueriedSearchHistoryResults = ({ maxLength = null }) => (
    useQueriedSearchHistory({
        maxLength,
        transform: historyEntriesToSearchResults
    })
)

const useSearchResult = () => useSelector(selectSearchResult)

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
}
