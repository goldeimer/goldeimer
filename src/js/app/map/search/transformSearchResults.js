import { generateShortId } from '@lib/util/generateId'

import SEARCH_RESULT_TYPE from '@map/search/enumSearchResultType'

const federalStates = [
    'Baden-Württemberg',
    'Bayern',
    'Berlin',
    'Brandenburg',
    'Bremen',
    'Hamburg',
    'Hessen',
    'Mecklenburg-Vorpommern',
    'Niedersachsen',
    'Nordrhein-Westfalen',
    'Rheinland-Pfalz',
    'Saarland',
    'Sachsen',
    'Sachsen-Anhalt',
    'Schleswig-Holstein',
    // MapTiler (OSM?): Erroneous data in `place_name_de`.
    'Šlezvicko-Holštajnsko',
    'Thüringen'
]

const sanitizeMapTilerPlaceName = (placeName) => {
    const sanitized = placeName.replace(
        /,+/gu,
        ','
    )

    if (federalStates.some(
        (federalState) => placeName.endsWith(federalState)
    )) {
        return sanitized.replace(
            new RegExp(',\\s*?[\\-\\w\\sšŠ]*?$', 'gu'), ''
        )
    }

    return sanitized
}

// TODO: More defensive property access.
const getPlaceNameFromGeocodingResult = (result) => (
    sanitizeMapTilerPlaceName(result.place_name_de)
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
        id: resultId,
        longitude,
        latitude,
        placeName
    }
}) => ({
    label: placeName,
    value: {
        id,
        resultId,
        longitude,
        latitude,
        placeName,
        type: SEARCH_RESULT_TYPE.history
    }
})

const historyEntriesToSearchResults = (entries) => entries.map(
    (entry) => historyEntryToSearchResult(entry)
)

export {
    geocodingResultToSearchResult,
    geocodingResultsToSearchResults,
    historyEntryToSearchResult,
    historyEntriesToSearchResults,
    SEARCH_RESULT_TYPE
}
