import { makeEnum } from '@lib/enum'

const {
    enum: CONTEXT_TYPE
} = makeEnum([
    'noContext',
    'currentLocation',
    'feature',
    'geocodingResult'
], 'ContextType')

export default CONTEXT_TYPE
