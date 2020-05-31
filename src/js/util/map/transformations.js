import {
    getColorByTaxonomyTermId,
    getIconComponentByTaxonomyTermId,
    VISUALIZED_TAXONOMY
} from 'enum/taxonomies'

const transformGeoJsonFeaturesToGeometries = (features) => features.map(
    ({
        geometry: { coordinates: [longitude, latitude] },
        properties: { id }
    }) => ({ id, latitude, longitude })
)

const transformGeoJsonFeaturesToLookup = (features) => new Map(features.map(
    (feature) => [feature.properties.id, feature]
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
            id
        },
        ...feature
    }) => ({
        ...feature,
        properties: {
            colorTaxonomyTermId: colorTaxonomyTerms[0] || null,
            iconTaxonomyTermId: iconTaxonomyTerms[0] || null,
            placeName,
            id
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
        colorTaxonomyTermId, iconTaxonomyTermId, placeName, id
    }
}) => ({
    color: getColorByTaxonomyTermId(colorTaxonomyTermId),
    iconComponent: getIconComponentByTaxonomyTermId(iconTaxonomyTermId),
    id,
    latitude,
    longitude,
    placeName
}))

const transformGeoJsonFeaturesToSearcheables = (
    features,
    searchableKeys
) => features.map(
    ({ properties: { id, ...properties } }) => ({
        id,
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
