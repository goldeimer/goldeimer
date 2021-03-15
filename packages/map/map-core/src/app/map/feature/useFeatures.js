import { useSelector } from 'react-redux'

import { FeatureFormat } from '../enum'

import getSourceFeatures, {
    getFeatureById,
    getFeaturesById,
    getSourceFeatureGeometriesByProximity,
    selectEnrichedViewFeatures,
    selectSourceReceivedAt
} from './selectFeatures'

const useFeature = (id, format = FeatureFormat.geojson) => useSelector(
    getFeatureById(id, format)
)

const useFeatures = (ids = [], format = FeatureFormat.geojson) => useSelector(
    getFeaturesById(ids, format)
)

const useSourceRedeivedAt = () => useSelector(selectSourceReceivedAt)

const useSourceFeatures = (
    format = FeatureFormat.geojson,
    shouldFilter = true,
    shouldSort = false
) => useSelector(
    getSourceFeatures(format, shouldFilter, shouldSort)
)

const useSourceFeaturesByProximity = (
    latitude,
    longitude,
    options = {}
) => {
    const {
        format = FeatureFormat.detail,
        ...selectorOptions
    } = options

    const geometries = useSelector(
        getSourceFeatureGeometriesByProximity(
            latitude,
            longitude,
            selectorOptions
        )
    )

    const features = useFeatures(geometries.map(({ id }) => id), format)

    return features.map((feature) => ({
        ...geometries.find(({ id }) => id === feature.id),
        ...feature
    }))
}

const useViewFeatures = () => {
    const viewFeatures = useSelector(selectEnrichedViewFeatures)
    return viewFeatures
}

const useDetail = (id) => useFeature(id, FeatureFormat.detail)

export {
    useSourceFeatures as default,
    useDetail,
    useFeature,
    useFeatures,
    useSourceFeaturesByProximity,
    useSourceRedeivedAt,
    useViewFeatures
}
