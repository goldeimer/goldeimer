import {
    getColorByTaxonomyTerm,
    getIconComponentByTaxonomyTerm
} from 'enum/taxonomies'
import isArray from 'util/isArray'
import parseStringifiedCollection from 'util/parseJson'

const COLOR_TAXONOMY = 'brands'
const ICON_TAXONOMY = 'merchantTypes'

const makeFeatureCollection = (features) => ({
    type: 'FeatureCollection',
    features
})

const getFirstTerm = (properties, taxonomyId, shouldParse = false) => {
    if (!(taxonomyId in properties)) {
        return null
    }

    const terms = shouldParse
        ? parseStringifiedCollection(properties[taxonomyId])
        : properties[taxonomyId]

    return !isArray(terms) || terms.length < 0 ? null : terms[0]
}

const transformFeatureToEssentialMarkerProps = (
    { geometry: { coordinates }, properties },
    shouldParse = false
) => {
    const colorTaxonomyTerm = getFirstTerm(
        properties,
        COLOR_TAXONOMY,
        shouldParse
    )

    const iconTaxonomyTerm = getFirstTerm(
        properties,
        ICON_TAXONOMY,
        shouldParse
    )

    return {
        color: getColorByTaxonomyTerm(colorTaxonomyTerm),
        iconComponent: getIconComponentByTaxonomyTerm(iconTaxonomyTerm),
        latitude: coordinates[1],
        longitude: coordinates[0],
        placeName: properties.name,
        uuid: properties.uuid
    }
}

export {
    makeFeatureCollection,
    transformFeatureToEssentialMarkerProps
}
