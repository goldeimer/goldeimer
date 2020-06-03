import payload from '@lib/redux/payload'
import { sanitizeWithinRange } from '@lib/util/sanitizeNumericValue'

const INITIAL_COORDINATES = {
    latitude: 50.75,
    longitude: 10
}

const sanitizeCoordinates = ({ latitude, longitude }) => ({
    latitude: sanitizeWithinRange(latitude, -90, 90),
    longitude: sanitizeWithinRange(longitude, -180, 180)
})

const coordinatesReducer = payload(sanitizeCoordinates)

export {
    coordinatesReducer,
    INITIAL_COORDINATES
}
