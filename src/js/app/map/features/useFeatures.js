import { useSelector } from 'react-redux'

import getSourceFeatures, {
    selectViewportFeatures,
    FORMAT
} from '@map/features/selectFeatures'

const useSourceFeatures = (
    format = FORMAT.geojson
) => useSelector((state) => (
    getSourceFeatures(state, format, true, false)
))

const useViewportFeatures = () => useSelector(selectViewportFeatures)

export {
    useSourceFeatures as default,
    useViewportFeatures
}
