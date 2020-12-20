import { useSelector } from 'react-redux'

import {
    ContextType,
    FeatureFormat
} from '../enum'
import { getFeatureById } from '../feature'

import selectContext from './selectContext'

const useContext = () => {
    const context = useSelector(selectContext)

    const {
        id,
        type
    } = context

    const hasContext = !type || type === ContextType.NONE

    const feature = useSelector(
        type === ContextType.FEATURE
            ? getFeatureById(id, FeatureFormat.detail)
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
