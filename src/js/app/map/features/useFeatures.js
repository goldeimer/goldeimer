import { useSelector } from 'react-redux'

import { summateObjects } from '@lib/util/collections'

import { getColorAndIconComponent } from '@map/config/taxonomies'

import getSourceFeatures, {
    getFeatureById,
    getFeaturesById,
    selectViewFeatures,
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

const useViewFeatures = () => {
    const { clusters, markers } = useSelector(selectViewFeatures)
    const pointCounts = summateObjects(clusters, 'pointCount')

    const totals = clusters.map(({ pointCount }) => pointCount.total)
    const domain = [
        Math.min(...totals),
        Math.max(...totals)
    ]

    return {
        clusters: clusters.map((cluster) => ({
            ...cluster,
            domain
        })),
        markers: markers.map(({
            colorTermId,
            iconTermId,
            ...rest
        }) => ({
            ...rest,
            ...getColorAndIconComponent(
                colorTermId,
                iconTermId
            )
        })),
        pointCounts
    }
}

const useDetail = (id) => useFeature(id, FEATURE_FORMAT.detail)

export {
    useSourceFeatures as default,
    useDetail,
    useFeature,
    useFeatures,
    useViewFeatures
}
