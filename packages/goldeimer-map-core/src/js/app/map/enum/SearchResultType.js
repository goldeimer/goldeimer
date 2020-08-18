import makeEnum from '@lib/enum/makeEnum'

const {
    enum: SEARCH_RESULT_TYPE
} = makeEnum([
    'feature',
    'geocoding',
    'history'
], 'SearchResultType')

export default SEARCH_RESULT_TYPE
