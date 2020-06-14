import { generateShortId } from '@lib/util/generateId'
import { uniqueByKey } from '@lib/util/array'
import SEARCH_RESULT_TYPE from '@map/search/enumSearchResultType'

const sanitizeMapTilerPlaceName = (placeName) => {
    let sanitized = placeName.split(',').map(
        (part) => part.trim()
    ).filter((part, index, newParts) => (
        part && index === newParts.indexOf(part)
    )).join(', ')

    sanitized = sanitized.replace(
        /B.densko-Wurttembersko/gu,
        'Baden-Württemberg'
    )

    sanitized = sanitized.replace(
        /.lezvicko-Hol.tajnsko/gu,
        'Schleswig-Holstein'
    )

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

// TODO:
// Filter elsewhere.
// Doesn't belong here.
const geocodingResultsToSearchResults = (results) => uniqueByKey(
    results.map(
        (result) => geocodingResultToSearchResult(result)
    ),
    'label'
)

const historyEntryToSearchResult = ({
    id,
    result: {
        id: _id,
        longitude,
        latitude,
        placeName,
        resultId
    }
}) => ({
    label: placeName,
    value: {
        id: _id,
        resultId: resultId || _id,
        longitude: parseFloat(longitude),
        latitude: parseFloat(latitude),
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
