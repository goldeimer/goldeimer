/// Geocoding Utility
///
/// @brief Supports both regular and reverse geocoding requests.
///
/// ### Alternative (OSM) API
/// - [endpoint](https://nominatim.openstreetmap.org/search/<query>?<params>)
/// - [documentation](https://nominatim.org/release-docs/develop/api/Search/)

import axios from 'axios'

import { MAP_TILER_API_KEY } from '@config/apiKeys'
import log from '@lib/util/log'

// Hamburg, Germany
const DEFAULT_PROXIMITY = '10.00,53.56'

// "DACH" region
//
// @see https://en.wikipedia.org/wiki/Lists_of_extreme_points
//
// - NORTH: List auf Sylt, Germany (55.05)
// - WEST: Isenbruch, near Millen, North Rhine-Westphalia, Germany (5.85)
// - EAST: Corner of a field near Deutsch Jahrndorf, Burgenland, Austria (17.16)
// - SOUTH: Border with Italy, Pedrinate, Ticino, Switzerland (45.83)
const DEFAULT_BOUNDING_BOX = '5.85,45.83,17.16,55.05'

const MAP_TILER_GEOCODING_ENDPOINT = 'https://api.maptiler.com/geocoding/'

const geocodingRequest = async (
    query,
    bbox = DEFAULT_BOUNDING_BOX,
    proximity = DEFAULT_PROXIMITY
) => {
    const bboxQueryArg = bbox ? `&bbox=${bbox}` : ''
    const proximityQueryArg = proximity ? `&proximity=${proximity}` : ''

    const requestUrl = `${MAP_TILER_GEOCODING_ENDPOINT}${query}.json?key=${MAP_TILER_API_KEY}&language=de,en${bboxQueryArg}${proximityQueryArg}`

    try {
        const response = await axios.get(requestUrl)

        return response.data
    } catch (error) {
        log(error)

        return null
    }
}

const freeFormGeocodingRequest = async (
    searchString,
    bbox = DEFAULT_BOUNDING_BOX,
    proximity = DEFAULT_PROXIMITY
) => {
    const response = await geocodingRequest(
        `${searchString}`,
        bbox,
        proximity
    )

    return response
}

const reverseGeocodingRequest = async (
    longitude,
    latitude,
    bbox = DEFAULT_BOUNDING_BOX,
    proximity = DEFAULT_PROXIMITY
) => {
    const response = await geocodingRequest(
        `${longitude},${latitude}`,
        bbox,
        proximity
    )

    return response
}

export {
    geocodingRequest as default,
    freeFormGeocodingRequest,
    reverseGeocodingRequest
}
