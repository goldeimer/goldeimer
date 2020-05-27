const DEG_TO_RAD_CONVERSION_RATE = Math.PI / 180

const degToRad = (degrees) => (degrees * DEG_TO_RAD_CONVERSION_RATE)

const distanceByHaversine = (
    { latitude: latitudeA, longitude: longitudeA },
    { latitude: latitudeB, longitude: longitudeB }
) => {
    const earthRadius = 6371e3
    const φ1 = degToRad(latitudeA)
    const φ2 = degToRad(latitudeB)
    const Δφ = degToRad(latitudeB - latitudeA)
    const Δλ = degToRad(longitudeB - longitudeA)

    const tmp = (
        Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2)
    )

    return earthRadius * (2 * Math.atan2(Math.sqrt(tmp), Math.sqrt(1-tmp)))
}

export default distanceByHaversine
