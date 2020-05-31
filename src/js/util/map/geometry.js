const transformCoordinatesToLatLon = ([longitude, latitude]) => (
    { latitude, longitude }
)

const transformLatLonToCoordinates = ({ latitude, longitude }) => (
    [longitude, latitude]
)

export {
    transformCoordinatesToLatLon,
    transformLatLonToCoordinates
}
