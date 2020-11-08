import { useSelector } from 'react-redux'

import {
    CONTEXT_TYPE,
    FEATURE_FORMAT
} from '@map/enum'
import { getFeatureById } from '@map/features'

import selectContext from '@map/context/selectContext'

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
