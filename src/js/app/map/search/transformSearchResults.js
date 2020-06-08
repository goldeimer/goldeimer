import { generateShortId } from '@lib/util/generateId'

import SEARCH_RESULT_TYPE from '@map/search/enumSearchResultType'

// TODO: More defensive property access.
const getPlaceNameFromGeocodingResult = (result) => (
    result.place_name_de.replace(
        /,+/g,
        ','
    )
)

const geocodingResultToSearchResult = ({
    center,
    id = generateShortId(),
    ...result
}) => {
    const placeName = getPlaceNameFromGeocodingResult(result)

    return {
        label: placeName,
        value: {
            id,
            longitude: center[0],
            latitude: center[1],
            placeName,
            type: SEARCH_RESULT_TYPE.geocoding
        }
    }
}

const geocodingResultsToSearchResults = (results) => results.map(
    (result) => geocodingResultToSearchResult(result)
)

const historyEntryToSearchResult = ({
    id,
    result: {
        longitude,
        latitude,
        placeName
    }
}) => ({
    label: placeName,
    value: {
        id,
        longitude,
        latitude,
        placeName,
        type: SEARCH_RESULT_TYPE.history
    }
})

const historyEntriesToSearchResults = (entries) => entries.map(
    (entry) => geocodingResultToSearchResult(entry)
)

export {
    geocodingResultToSearchResult,
    geocodingResultsToSearchResults,
    historyEntryToSearchResult,
    historyEntriesToSearchResults,
    SEARCH_RESULT_TYPE
}
