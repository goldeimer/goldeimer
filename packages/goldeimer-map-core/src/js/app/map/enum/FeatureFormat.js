import { makeEnum } from '@lib/enum'

const { enum: FEATURE_FORMAT } = makeEnum([
    'detail',
    'geojson',
    'geometry',
    'location',
    'lookup',
    'mapGl',
    'marker',
    'searchable',
    'searchResult'
], 'FeatureFormat')

export default FEATURE_FORMAT
