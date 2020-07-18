// TODO:
// Taxonomies relevant to color and icon are meant to be admin user choices.
// Make stubs dynamic.
// Since we're importing from the taxonomies stub here anyway, stub the
// transformation here as well.

import { identity } from '@lib/util/noop'

import { CONTEXT_TYPE } from '@map/context'
import {
    getColorAndIconComponent,
    getFullTaxonomyVisualization,
    getPrimaryTaxonomy,
    getSecondaryTaxonomy,
    getTermNameByTaxonomyIdAndTermId,
    VISUALIZED_TAXONOMY
} from '@map/config/taxonomies'
import { makeLocation } from '@map/util'
import SEARCH_RESULT_TYPE from '@map/search/enumSearchResultType'
import FEATURE_FORMAT from '@map/features/enumFeatureFormat'

const primaryTaxonomy = getPrimaryTaxonomy()
const secondaryTaxonomy = getSecondaryTaxonomy()

/// ------------------- transforming individual features -----------------------

const featureToDetail = (
    {
        geometry: { coordinates: [longitude, latitude] },
        properties
    },
    primaryTaxonomyId,
    secondaryTaxonomyId
) => ({
    ...getColorAndIconComponent(
        properties[secondaryTaxonomyId][0],
        properties[primaryTaxonomyId][0]
    ),
    primaryTermName: properties[primaryTaxonomyId].map(
        (termId) => getTermNameByTaxonomyIdAndTermId(
            primaryTaxonomyId,
            termId,
            'Händler'
        )
    ).filter((termName, index, newArray) => (
        newArray.indexOf(termName) === index
    )).sort().join(', '),
    secondaryTerms: properties[secondaryTaxonomyId].map(
        (termId) => getFullTaxonomyVisualization({
            taxonomyId: secondaryTaxonomyId,
            termId,
            defaultTermName: 'Unbekannt'
        })
    ),
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
    ...properties
})

const detailToFeatureContext = (detail) => ({
    ...makeLocation(detail),
    type: CONTEXT_TYPE.feature.value
})

const featureToDetailFixedTaxonomiesStub = (
    feature
) => featureToDetail(
    feature,
    VISUALIZED_TAXONOMY.primary,
    VISUALIZED_TAXONOMY.secondary
)

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
    colorTermId,
    iconTermId
) => ({
    label: `${placeName}, ${street}, ${city}`,
    value: {
        ...getColorAndIconComponent(
            properties[colorTermId][0],
            properties[iconTermId][0]
        ),
        id,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
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

const mapGlClusterToMarkerState = (
    {
        geometry: { coordinates: [longitude, latitude] },
        id,
        properties: {
            point_count: pointCount,
            ...properties
        },
        tile
    }
) => ({
    id,
    latitude,
    longitude,
    pointCount: {
        total: pointCount,
        ...primaryTaxonomy.terms.reduce((
            acc,
            { termId: primaryTermId },
            primaryIndex
        ) => {
            const primaryTermValue = properties[primaryTermId] || 0

            return secondaryTaxonomy.terms.reduce((
                acc2,
                { termId: secondaryTermId },
                secondaryIndex
            ) => {
                const secondaryTermValue = properties[secondaryTermId] || 0
                const sharedValue = properties[`${primaryTermId}:${secondaryTermId}`] || 0

                const acc2PrimarySecondary = (
                    acc2.primary[primaryTermId] || {}
                ).secondary || {}

                const acc2SecondaryPrimary = (
                    acc2.secondary[secondaryTermId] || {}
                ).primary || {}

                return {
                    primary: {
                        ...acc2.primary,
                        [primaryTermId]: {
                            secondary: {
                                ...acc2PrimarySecondary,
                                [secondaryTermId]: sharedValue
                            },
                            total: primaryTermValue
                        },
                        total: acc2.primary.total + (
                            secondaryIndex === 0 ? primaryTermValue : 0
                        )
                    },
                    secondary: {
                        ...acc2.secondary,
                        [secondaryTermId]: {
                            primary: {
                                ...acc2SecondaryPrimary,
                                [primaryTermId]: sharedValue
                            },
                            total: secondaryTermValue
                        },
                        total: acc2.secondary.total + (
                            primaryIndex === 0 ? secondaryTermValue : 0
                        )
                    }
                }
            }, acc)
        }, {
            primary: {
                total: 0
            },
            secondary: {
                total: 0
            }
        })
    },
    tile
})

const mapGlFeatureToMarkerState = ({
    geometry: { coordinates: [longitude, latitude] },
    properties: {
        colorTermId, iconTermId, id
    }
}) => ({
    colorTermId,
    iconTermId,
    id,
    latitude,
    longitude
})

/// ----------------------- transforming collections ---------------------------

const featuresToDetails = (
    features
) => features.map(featureToDetailFixedTaxonomiesStub)

const featuresToGeometries = (
    features
) => features.map(featureToGeometry)

const featuresToLocations = (
    features
) => features.map(featureToLocation)

const featuresToSearchResults = (
    features
) => features.map(featureToSearchResultFixedTaxonomiesStub)

const mapGlClustersToMarkerState = (
    clusters
) => clusters.map(mapGlClusterToMarkerState)

const mapGlFeaturesToMarkerState = (
    features
) => features.map(mapGlFeatureToMarkerState)

/// --------------------- dedicated utility collections ------------------------

const featuresToLookup = (features) => new Map(features.map(
    (feature) => [feature.properties.id, feature]
))

const featuresToMapGlProps = (
    features,
    primaryTaxonomyId,
    secondaryTaxonomyId
) => ({
    type: 'FeatureCollection',
    features: features.map(({
        properties: {
            [primaryTaxonomyId]: primaryTerms,
            [secondaryTaxonomyId]: secondaryTerms,
            placeName,
            id
        },
        ...feature
    }) => ({
        ...feature,
        properties: {
            colorTermId: secondaryTerms[0] || null,
            iconTermId: primaryTerms[0] || null,
            id,
            placeName,
            [primaryTaxonomyId]: primaryTerms,
            [secondaryTaxonomyId]: secondaryTerms
        }
    }))
})

const featuresToMapGlPropsFixedTaxonomiesStub = (
    features
) => featuresToMapGlProps(
    features,
    VISUALIZED_TAXONOMY.primary,
    VISUALIZED_TAXONOMY.secondary
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
    case FEATURE_FORMAT.detail:
        return targetIsCollection
            ? featuresToDetails
            : featureToDetailFixedTaxonomiesStub

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
    detailToFeatureContext,
    featuresToFeatureCollection,
    getFeatureTransform,
    getFeaturesTransform,
    getTransform,
    mapGlClustersToMarkerState,
    mapGlFeaturesToMarkerState,
    FEATURE_FORMAT
}
