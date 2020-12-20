import { makeEnum } from '@goldeimer/js-util'

const FeatureFormat = /*@__PURE__*/ makeEnum([
    'detail',
    'geojson',
    'geometry',
    'location',
    'lookup',
    'map-gl',
    'marker',
    'searchable',
    'search-result'
])

export default FeatureFormat
