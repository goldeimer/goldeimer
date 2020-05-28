/// State Model
///
/// "readme"-type file w/ syntax highlighting.
/// Not to be imported anywhere.

const location = {
    latitude: 0,
    longitude: 0,
    placeName: ''
}

const searchResult = {
    ...location,
    timestamp: 123,
    uuid: 'uuid'
}

const stateModel = {
    map: {
//         context: {
//             data: {},
//             type: '(feature|location)',
//             uuid: 'uuid',
//         },
        error: [] // error queue, stub
        features: {
            source: {
                data: [{}],
                received: timestamp,
            },
            viewport: {
//                 clustered: {
//                     total: 123,
//                     color: {
//                         color1: 100,
//                         color2: 23
//                     },
//                 },
//                 points: {
//                     color: 'color(ref)',
//                     icon: 'icon(ref)',
//                     latitude: 0,
//                     longitude: 0,
//                     placeName: 'placeName',
//                     uuid: 'uuid'
//                 },
            },
        },
//         search: {
//             current: 'current',
//             history: [searchResult, searchResult]
//         },
        settings: {
            app: {
                theme: 'themeId'
            },
            map: {
                filter: {
                    taxonomy1: [term1, term2],
                    taxonomy2: [term3],
                },
                sort: {
                    order: 'asc',
                    orderBy: 'name',
                },
            },
//             user: {
//                 home: location,
//             },
        }
    }
}

const featureSubSetSelectionModel = {
    filtered: {
//         uuids: ['uuid'],
        geojson: {
            features: [{
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [longitude, latitude],
                },
                properties: {
                    color: 'color(ref)',
                    icon: 'icon(ref)',
                    placeName: 'placeName',
                    uuid: 'uuid',
                }
            }],
            type: 'FeatureCollection',
        },
        geometry: [{
            latitude: 0,
            longitude: 0,
            uuid: 'uuid',
        }],
        searcheable: [{
            terms: ['city', 'placeName', 'street',]
            uuid: 'uuid',
        }]
    },
    lookup: Map('uuid', {}),
}
