import {
    getColorByTaxonomyTermId,
    getIconComponentByTaxonomyTermId,
    VISUALIZED_TAXONOMY
} from 'enum/taxonomies'

const transformGeoJsonFeaturesToGeometries = (features) => features.map(
    ({
        geometry: { coordinates: [longitude, latitude] },
        properties: { uuid }
    }) => ({ latitude, longitude, uuid })
)

const transformGeoJsonFeaturesToLookup = (features) => new Map(features.map(
    (feature) => [feature.properties.uuid, feature]
))

const transformGeoJsonFeaturesToMapEssential = (
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
            uuid
        },
        ...feature
    }) => ({
        ...feature,
        properties: {
            colorTaxonomyTermId: colorTaxonomyTerms[0] || null,
            iconTaxonomyTermId: iconTaxonomyTerms[0] || null,
            placeName,
            uuid
        }
    }))
})

// TODO:
// Taxonomies relevant to color and icon are meant to be admin user choices.
// Make dynamic.
// Since we're importing from the taxonomies stub here anyway, stub the
// transformation here as well.
const transformGeoJsonFeaturesToMapEssentialFixedTaxonomiesStub = (
    features
) => transformGeoJsonFeaturesToMapEssential(
    features,
    VISUALIZED_TAXONOMY.color,
    VISUALIZED_TAXONOMY.icon
)

const transformGeoJsonFeaturesToMarkerProps = (features) => features.map(({
    geometry: { coordinates: [longitude, latitude] },
    properties: {
        colorTaxonomyTermId, iconTaxonomyTermId, placeName, uuid
    }
}) => ({
    color: getColorByTaxonomyTermId(colorTaxonomyTermId),
    iconComponent: getIconComponentByTaxonomyTermId(iconTaxonomyTermId),
    latitude,
    longitude,
    placeName,
    uuid
}))

const transformGeoJsonFeaturesToSearcheables = (
    features,
    searchableKeys
) => features.map(
    ({ properties: { uuid, ...properties } }) => ({
        uuid,
        terms: searchableKeys.map((key) => properties[key])
    })
)

export {
    transformGeoJsonFeaturesToGeometries,
    transformGeoJsonFeaturesToLookup,
    transformGeoJsonFeaturesToMapEssentialFixedTaxonomiesStub
    as transformGeoJsonFeaturesToMapEssential,
    transformGeoJsonFeaturesToMarkerProps,
    transformGeoJsonFeaturesToSearcheables
}
