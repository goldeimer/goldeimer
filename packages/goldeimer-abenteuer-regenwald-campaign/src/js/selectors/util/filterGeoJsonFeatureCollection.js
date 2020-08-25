const filterGeoJsonFeatureCollection = (
    featureCollection,
    selectedTerms
) => {
    if (!featureCollection) {
        return featureCollection
    }

    const filteredFeatures = featureCollection.features.filter(
        (feature) => {
            const selectedTermsPerTaxonomy = Object.entries(selectedTerms)

            /* eslint-disable-next-line no-restricted-syntax */
            for (
                const [taxonomyId, selectedTermIds] of selectedTermsPerTaxonomy
            ) {
                if (taxonomyId in feature.properties) {
                    if (
                        feature.properties[taxonomyId].filter(
                            (termId) => selectedTermIds.includes(termId)
                        ).length === 0
                    ) {
                        return false
                    }
                }
            }

            return true
        }
    )

    return {
        type: 'FeatureCollection',
        features: filteredFeatures
    }
}

export default filterGeoJsonFeatureCollection
