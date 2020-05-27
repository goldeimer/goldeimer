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
    latitude: 0,
    longitude: 0,
    placeName: '',
    timestamp: timestamp
}

const stateModel = {
    map: {
        detail: {
            type: ('feature', 'location',)
            id: ('uuid' | location)
        },
        features: {
            collection: {},
            markers: {},
            received: timestamp,
        },
        home: {},
        search: {
            history: [searchResult1, searchResult2]
        },
        settings: {
            filter: {
                selectedTerms: {
                    taxonomy1: [term1, term2],
                    taxonomy2: [term3],
                }
            },
            sort: {
                order: 'asc',
                orderBy: 'name',
            }
        }
    }
}
