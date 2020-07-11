import { useSelector } from 'react-redux'

import { getFeatureById, FEATURE_FORMAT } from '@map/features'

import selectContext from '@map/context/selectContext'
import CONTEXT_TYPE from '@map/context/enumContextType'

const useContext = () => {
    const context = useSelector(selectContext)

    const {
        id,
        type
    } = context

    const hasContext = !CONTEXT_TYPE.noContext.is(type)

    const feature = useSelector(
        CONTEXT_TYPE.feature.is(type)
            ? getFeatureById(id, FEATURE_FORMAT.detail)
            : () => null
    )

    // enriched context
    return {
        ...context,
        hasContext,
        ...feature
    }
}

export default useContext
