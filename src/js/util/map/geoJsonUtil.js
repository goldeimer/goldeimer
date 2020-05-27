import {
    getColorByTaxonomyTermId,
    getIconComponentByTaxonomyTermId,
    VISUALIZED_TAXONOMY
} from 'enum/taxonomies'
import isArray from 'util/isArray'
import parseStringifiedCollection from 'util/parseJson'

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

    return isArray(terms) && terms.length > 0 ? terms[0] : null
}

const transformFeatureToEssentialMarkerProps = (
    { geometry: { coordinates }, properties },
    shouldParse = false,
    lala = false
) => {
    const colorTaxonomyTerm = getFirstTerm(
        properties,
        VISUALIZED_TAXONOMY.color,
        shouldParse
    )

    const iconTaxonomyTerm = getFirstTerm(
        properties,
        VISUALIZED_TAXONOMY.icon,
        shouldParse
    )

    return {
        color: getColorByTaxonomyTermId(colorTaxonomyTerm, lala),
        iconComponent: getIconComponentByTaxonomyTermId(iconTaxonomyTerm),
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
