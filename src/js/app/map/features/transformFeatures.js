// TODO:
// Taxonomies relevant to color and icon are meant to be admin user choices.
// Make stubs dynamic.
// Since we're importing from the taxonomies stub here anyway, stub the
// transformation here as well.

import { identity } from '@lib/util/noop'

import {
    getColorByTaxonomyTermId,
    getIconComponentByTaxonomyTermId,
    VISUALIZED_TAXONOMY
} from '@map/taxonomies'
import SEARCH_RESULT_TYPE from '@map/search/enumSearchResultType'
import FEATURE_FORMAT from '@map/features/enumFeatureFormat'

/// ------------------- transforming individual features -----------------------

const featureToGeometry = ({
    geometry: { coordinates: [longitude, latitude] },
    properties: { id }
}) => ({ id, latitude, longitude })

const featureToLocation = ({
    geometry: { coordinates: [longitude, latitude] },
    properties: { id, placeName }
}) => ({ id, latitude, longitude, placeName })

const featureToSearchResult = (
    {
        geometry: { coordinates: [longitude, latitude] },
        properties: { city, id, placeName, street, ...properties }
    },
    colorTaxonomyTermId,
    iconTaxonomyTermId
) => ({
    label: `${placeName}, ${street}, ${city}`,
    value: {
        color: getColorByTaxonomyTermId(
            properties[colorTaxonomyTermId][0]
        ),
        iconComponent: getIconComponentByTaxonomyTermId(
            properties[iconTaxonomyTermId][0]
        ),
        id,
        latitude,
        longitude,
        placeName,
        type: SEARCH_RESULT_TYPE.feature
    }
})

const featureToSearchResultFixedTaxonomiesStub = (
    feature
) => featureToSearchResult(
    feature,
    VISUALIZED_TAXONOMY.color,
    VISUALIZED_TAXONOMY.icon
)

const mapGlFeatureToMarkerProps = ({
    geometry: { coordinates: [longitude, latitude] },
    properties: {
        colorTaxonomyTermId, iconTaxonomyTermId, placeName, id
    }
}) => ({
    color: getColorByTaxonomyTermId(colorTaxonomyTermId),
    iconComponent: getIconComponentByTaxonomyTermId(iconTaxonomyTermId),
    id,
    latitude,
    longitude,
    placeName
})

/// ----------------------- transforming collections ---------------------------

const featuresToGeometries = (
    features
) => features.map(featureToGeometry)

const featuresToLocations = (
    features
) => features.map(featureToLocation)

const featuresToSearchResults = (
    features
) => features.map(featureToSearchResultFixedTaxonomiesStub)

const mapGlFeaturesToMarkerProps = (
    features
) => features.map(mapGlFeatureToMarkerProps)

/// --------------------- dedicated utility collections ------------------------

const featuresToLookup = (features) => new Map(features.map(
    (feature) => [feature.properties.id, feature]
))

const featuresToMapGlProps = (
    features,
    colorTaxonomyId,
    iconTaxonomyId
) => ({
    type: 'FeatureCollection',
    features: features.map(({
        properties: {
            [colorTaxonomyId]: colorTaxonomyTerms,
            [iconTaxonomyId]: iconTaxonomyTerms,
            placeName,
            id
        },
        ...feature
    }) => ({
        ...feature,
        properties: {
            // TODO: More defensive array access.
            colorTaxonomyTermId: colorTaxonomyTerms[0] || null,
            iconTaxonomyTermId: iconTaxonomyTerms[0] || null,
            placeName,
            id
        }
    }))
})

const featuresToMapGlPropsFixedTaxonomiesStub = (
    features
) => featuresToMapGlProps(
    features,
    VISUALIZED_TAXONOMY.color,
    VISUALIZED_TAXONOMY.icon
)

const featuresToSearcheables = (
    features,
    searchableKeys
) => features.map(
    ({ properties: { id, ...properties } }) => ({
        id,
        terms: searchableKeys.map((key) => properties[key])
    })
)

const featuresToSearcheablesFixedPropertyNamesStub = (features) => (
    featuresToSearcheables(
        features,
        ['placeName', 'street', 'city']
    )
)

/// ------------------------------ geojson util -------------------------------

const featuresToFeatureCollection = (features) => ({
    type: 'FeatureCollection',
    features
})

const getTransform = (format, targetIsCollection = true) => {
    // Most transforms are equally applicable to single items as well as
    // collections thereof. For some, that's less the case and the choice of
    // the single item transform returned in case of an (erroneous) false
    // `targetIsCollection` stems simply from the lack of saner options / ideas.
    switch (format) {
    case FEATURE_FORMAT.geojson:
        return identity

    case FEATURE_FORMAT.geometry:
        return targetIsCollection ? featuresToGeometries : featureToGeometry

    case FEATURE_FORMAT.location:
        return targetIsCollection ? featuresToLocations : featureToLocation

    case FEATURE_FORMAT.lookup:
        return targetIsCollection ? featuresToLookup : new Map()

    case FEATURE_FORMAT.mapGl:
        return targetIsCollection
            ? featuresToMapGlPropsFixedTaxonomiesStub
            : identity

    case FEATURE_FORMAT.searchable:
        return targetIsCollection
            ? featuresToSearcheablesFixedPropertyNamesStub
            : identity

    case FEATURE_FORMAT.searchResult:
        return targetIsCollection
            ? featuresToSearchResults
            : featureToSearchResultFixedTaxonomiesStub

    default:
        return identity
    }
}

const getFeatureTransform = (format) => getTransform(format, false)
const getFeaturesTransform = (format) => getTransform(format, true)

export {
    featuresToFeatureCollection,
    getFeatureTransform,
    getFeaturesTransform,
    getTransform,
    mapGlFeaturesToMarkerProps,
    FEATURE_FORMAT
}
