import { makeEnum } from '@lib/enum'

const CONTEXT_TYPE = makeEnum([
    'noContext',
    'currentLocation',
    'feature',
    'geocodingResult'
])

export default CONTEXT_TYPE
