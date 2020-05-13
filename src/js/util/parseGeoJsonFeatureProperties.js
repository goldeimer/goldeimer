import log from 'util/log'

/// TODO:
/// This is a hacky ad-hoc fix. Solve in more robust a fashion.
/// Out of the box, `mapbox-gl-js` does not support nested property values.
const parseGeoJsonFeatureProperties = (feature) => {
    const keysOfNestedProperties = [
        'address',
        'brands'
    ]

    const parsedFeature = feature
    keysOfNestedProperties.forEach(
        (key, index) => {
            try {
                parsedFeature.properties[key] = JSON.parse(
                    feature.properties[key]
                )
            } catch (error) {
                log(error)
            }
        }
    )

    return parsedFeature
}

export default parseGeoJsonFeatureProperties
