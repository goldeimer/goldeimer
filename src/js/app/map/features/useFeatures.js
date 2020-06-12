import { useSelector } from 'react-redux'

import { getColorAndIconComponent } from '@map/taxonomies'

import getSourceFeatures, {
    getFeatureById,
    getFeaturesById,
    selectViewportFeatures,
    FEATURE_FORMAT
} from '@map/features/selectFeatures'

const useFeature = (id, format = FEATURE_FORMAT.geojson) => useSelector(
    getFeatureById(id, format)
)

const useFeatures = (ids = [], format = FEATURE_FORMAT.geojson) => useSelector(
    getFeaturesById(ids, format)
)

const useSourceFeatures = (format = FEATURE_FORMAT.geojson) => useSelector(
    getSourceFeatures(format, true)
)

const useViewportFeatures = () => {
    const { clusters, markers } = useSelector(selectViewportFeatures)

    return {
        clusters,
        markers: markers.map((marker) => {
            const {
                colorTaxonomyTermId,
                iconTaxonomyTermId,
                ...rest
            } = marker

            return {
                ...rest,
                ...getColorAndIconComponent(
                    colorTaxonomyTermId,
                    iconTaxonomyTermId
                )
            }
        })
    }
}

const useDetail = (id) => useFeature(id, FEATURE_FORMAT.detail)

export {
    useSourceFeatures as default,
    useDetail,
    useFeature,
    useFeatures,
    useViewportFeatures
}
