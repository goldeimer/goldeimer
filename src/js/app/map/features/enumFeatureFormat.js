import makeEnum from '@lib/enum/makeEnum'

const FEATURE_FORMAT = makeEnum([
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
