import { makeEnum } from '@goldeimer/js-util'

const ContextType = /*@__PURE__*/ makeEnum([
    'none',
    'feature',
    'geocoding-result',
    'location'
])

export default ContextType
