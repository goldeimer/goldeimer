import { makeEnum } from '@lib/enum'

const FEATURE_FORMAT = makeEnum([
    'detail',
    'geojson',
    'geometry',
    'location',
    'lookup',
    'mapGl',
    'marker',
    'searchable',
    'searchResult'
])

export default FEATURE_FORMAT
