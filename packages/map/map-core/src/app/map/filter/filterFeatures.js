import { ensureArray } from '@goldeimer/js-util'

const isUnfilteredFeature = (properties, termsPerTaxonomy) => (
    termsPerTaxonomy.every(([taxonomyId, termIds]) => {
        if (taxonomyId in properties) {
            return ensureArray(properties[taxonomyId]).some(
                (termId) => termIds.includes(termId)
            )
        }

        return true
    })
)

const filterFeatures = (features, termsByTaxonomy) => {
    const termsPerTaxonomy = Object.entries(termsByTaxonomy)

    return features.filter(
        (feature) => isUnfilteredFeature(feature.properties, termsPerTaxonomy)
    )
}

export default filterFeatures
