import {
    DataType,
    TableType
} from '@goldeimer/data-util'

import {
    makeTable,
    withSections
} from './factory'

const ZOOM_LEVEL_VALIDATIONS = { max: 18, min: 1 }

export const TabSettings = withSections(makeTable(
    'Settings',
    'setting',
    'settings',
    `Application-wide settings applied by all clients
using this backend instance`,
    TableType.ConfigSingle
), [[[[
    [
        'appName',
        'App name',
        'The global name of your map application instance',
        DataType.Text
    ],
    { validations: { maxLength: 50 } }
],
[
    [
        'shortName',
        'Short Name',
        'A shorter variant of the name',
        DataType.Text
    ],
    { validations: { maxLength: 30 } }
],
[
    [
        'longName',
        'Long Name',
        'A shorter variant of the name',
        DataType.Text
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
        DataType.Bool
    ],
    { defaultValue: true }
],
[
    [
        'clusterRadius',
        'Cluster Radius',
        `The (maximum) radius for which an individual cluster
collects map features`,
        DataType.Number
    ],
    { validations: { max: 512, min: 50 } }
],
[
    [
        'maxClusterZoom',
        'Max. Cluster Zoom',
        '',
        DataType.Number
    ],
    { validations: ZOOM_LEVEL_VALIDATIONS }
],
[
    [
        'minClusterZoom',
        'Min. Cluster Zoom',
        '',
        DataType.Number
    ],
    { validations: ZOOM_LEVEL_VALIDATIONS }
]], [
    'Mapbox',
    'Settings passed to the underlying \'mapbox-gl-js\' instance'
]]])
