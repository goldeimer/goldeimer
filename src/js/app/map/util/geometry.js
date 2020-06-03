const coordinatesToLatLon = ([longitude, latitude]) => (
    { latitude, longitude }
)

const latLonToCoordinates = ({ latitude, longitude }) => (
    [longitude, latitude]
)

export {
    coordinatesToLatLon,
    latLonToCoordinates
}
