import makeEnum from '@lib/enum/makeEnum'

const SEARCH_RESULT_TYPE = makeEnum([
    'feature',
    'geocoding',
    'history'
])

export default SEARCH_RESULT_TYPE
