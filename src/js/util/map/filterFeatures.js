const filterFeatures = (
    features,
    selectedTerms
) => {
    if (!features) {
        return features
    }

    const selectedTermsPerTaxonomy = Object.entries(selectedTerms)

    return features.filter(
        (feature) => {
            const { properties } = feature

            let isValidFeature = true
            Object.entries(selectedTermsPerTaxonomy).forEach(
                ([taxonomyId, selectedTermIds]) => {
                    if (taxonomyId in properties) {
                        if (
                            properties[taxonomyId].filter(
                                (termId) => selectedTermIds.includes(termId)
                            ).length === 0
                        ) {
                            isValidFeature = false
                        }
                    }
                }
            )

            return isValidFeature
        }
    )
}

export default filterFeatures
