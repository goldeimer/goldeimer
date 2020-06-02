import { isString } from 'typechecker'

import log from '@lib/util/log'

const parseStringifiedCollection = (value) => {
    if (!isString(value)) {
        return value
    }

    if (!value.startsWith('[') && !value.startsWith('{')) {
        return value
    }

    try {
        return JSON.parse(value)
    } catch (error) {
        log(error)
    }

    return value
}

const parseStringifiedCollections = (parent) => (
    Object.fromEntries(
        Object.entries(parent).map(
            ([key, value]) => (
                [key, parseStringifiedCollection(value)]
            )
        )
    )
)

/// `mapbox-gl-js` does not support nesting or collections in property values,
/// i.e. the (Geo)JSON is only parsed one level past
/// `FeatureCollection.features[n].properties[key]`, while arrays and objects
/// remain stringified (are re-stringified (!)).
const parseGeoJsonFeatureProperties = (feature) => ({
    ...feature,
    properties: parseStringifiedCollections(feature.properties)
})

export {
    parseStringifiedCollection as default,
    parseStringifiedCollections,
    parseGeoJsonFeatureProperties
}
