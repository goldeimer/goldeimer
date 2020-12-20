import { useSelector } from 'react-redux'

import {
    identity,
    sortObjects,
    SortOrder,
    yes
} from '@goldeimer/js-util'

import { FeatureFormat } from '../enum'
import { useFeatures } from '../feature'

import { idNotInIds } from './filterGeocodingResults'
import {
    queryFeatureIds,
    querySearchHistory,
    selectGeocodingResults,
    selectQuery,
    selectSearchResult
} from './selectSearch'
import {
    geocodingResultsToSearchResults,
    historyEntriesToSearchResults
} from './transformSearchResults'

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
            SortOrder.DESC
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
    format = FeatureFormat.geojson,
    maxLength = null
}) => {
    const ids = useQueriedFeatureIds()
    const slicedIds = maxLength ? ids.slice(0, maxLength) : ids

    return useFeatures(slicedIds, format)
}

const useQueriedFeatureSearchResults = ({ maxLength = null }) => (
    useQueriedFeatures({
        format: FeatureFormat.searchResult,
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
