// @note maptiler.com does not return ISO country codes...
const DACH_REGION_COUNTRIES = ['Austria', 'Germany', 'Switzerland']

const geocodingResultIsDach = (feature) => {
    if (!feature.context) {
        return true
    }

    const countryEntry = feature.context.find(
        (entry) => (entry.id.startsWith('country.'))
    )

    if (!countryEntry.text_en) {
        return true
    }

    return DACH_REGION_COUNTRIES.includes(countryEntry.text_en)
}

const idNotInIds = (feature, ids) => !ids.includes(feature.id)

export {
    geocodingResultIsDach,
    idNotInIds
}
