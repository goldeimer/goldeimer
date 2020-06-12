import { useSelector } from 'react-redux'

import { sortObjects, SORT_ORDER } from '@lib/util/array'
import { identity, yes } from '@lib/util/noop'

import { FEATURE_FORMAT, useFeatures } from '@map/features'

import { idNotInIds } from '@map/search/filterGeocodingResults'

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
    excludeIds = [],
    maxLength = null,
    transform = identity
}) => {
    const results = useSelector(selectGeocodingResults)

    if (results.features) {
        const sorted = sortObjects(
            results.features.filter(
                (feature) => (
                    condition(feature) && idNotInIds(feature, excludeIds)
                )
            ),
            'relevance',
            SORT_ORDER.desc
        )

        const features = maxLength ? sorted.slice(0, maxLength) : sorted

        return transform(features)
    }

    return []
}

const useGeocodingSearchResults = ({
    condition = yes,
    excludeIds = [],
    maxLength = null
}) => (
    useGeocodingResults({
        condition,
        excludeIds,
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
    const slicedIds = maxLength ? ids.slice(0, maxLength) : ids

    return useFeatures(slicedIds, format)
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

    if (maxLength === null) {
        return transform(historyEntries)
    }

    return transform(historyEntries.slice(0, maxLength))
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
