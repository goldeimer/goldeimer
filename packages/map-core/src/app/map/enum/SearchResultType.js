import { makeEnum } from '@goldeimer/js-util'

const SearchResultType = /*@__PURE__*/ makeEnum([
    'feature',
    'geocoding',
    'history'
])

export default SearchResultType
