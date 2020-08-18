import {
    DATA_TYPE,
    TABLE_TYPE
} from '@gs/enum'

import {
    makeTable,
    withSections
} from '@gs/schema/factory'

const ZOOM_LEVEL_VALIDATIONS = { max: 18, min: 1 }

const TAB = withSections(makeTable(
    'Settings',
    'setting',
    'settings',
    `Application-wide settings applied by all clients
using this backend instance`,
    TABLE_TYPE.configSingle
), [[[[
    [
        'appName',
        'App name',
        'The global name of your map application instance',
        DATA_TYPE.text
    ],
    { validations: { maxLength: 50 } }
],
[
    [
        'shortName',
        'Short Name',
        'A shorter variant of the name',
        DATA_TYPE.text
    ],
    { validations: { maxLength: 30 } }
],
[
    [
        'longName',
        'Long Name',
        'A shorter variant of the name',
        DATA_TYPE.text
    ],
    { validations: { maxLength: 100 } }
]], [
    'Application',
    'Settings directly pertaining to the main application'
]
], [[[
    [
        'isClusteringEnabled',
        'Clustering enabled?',
        `Whether to cluster features
    at close distance and far zoom level`,
        DATA_TYPE.bool
    ],
    { defaultValue: true }
],
[
    [
        'clusterRadius',
        'Cluster Radius',
        `The (maximum) radius for which an individual cluster
collects map features`,
        DATA_TYPE.number
    ],
    { validations: { max: 512, min: 50 } }
],
[
    [
        'maxClusterZoom',
        'Max. Cluster Zoom',
        '',
        DATA_TYPE.number
    ],
    { validations: ZOOM_LEVEL_VALIDATIONS }
],
[
    [
        'minClusterZoom',
        'Min. Cluster Zoom',
        '',
        DATA_TYPE.number
    ],
    { validations: ZOOM_LEVEL_VALIDATIONS }
]], [
    'Mapbox',
    'Settings passed to the underlying \'mapbox-gl-js\' instance'
]]])

export default TAB
