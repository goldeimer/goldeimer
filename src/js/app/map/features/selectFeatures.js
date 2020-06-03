import { compose } from 'redux'
import { createCachedSelector, FifoObjectCache } from 're-reselect'
import stringify from 'json-stringify-deterministic'

import makeEnum from '@lib/enum/makeEnum'

import { filterFeatures, selectFilter } from '@map/filter'
import { sortFeatures, selectSort } from '@map/sort'

import {
    featuresToGeometries,
    featuresToLookup,
    featuresToMapGlProps,
    featuresToSearcheables
} from '@map/features/transformFeatures'

const CACHE_SIZE = 50

const FORMAT = makeEnum([
    'geojson',
    'geometry',
    'lookup',
    'mapGl',
    'marker',
    'searchable'
])

const selectSourceFeatures = (state) => (state.map.features.source.features)
const selectViewportFeatures = (state) => (state.map.features.viewport)

const makeChainable = (
    transform,
    ...args
) => (features) => transform(features, ...args)

const addTransform = (transforms, transform, ...args) => {
    transforms.unshift(makeChainable(transform, ...args))
}

const extractFeaturesFromSource = (
    features,
    filter,
    sort,
    format,
    shouldFilter,
    shouldSort
) => {
    const transforms = []

    if (shouldFilter) {
        addTransform(transforms, filterFeatures, filter)
    }

    if (shouldSort) {
        addTransform(transforms, sortFeatures, sort)
    }

    switch (format) {
    case FORMAT.geojson:
        break

    case FORMAT.geometry:
        addTransform(transforms, featuresToGeometries)
        break

    case FORMAT.lookup:
        addTransform(transforms, featuresToLookup)
        break

    case FORMAT.mapGl:
        addTransform(transforms, featuresToMapGlProps)
        break

        // case FORMAT.marker:
        //     addTransform(transforms, featuresToMarkerProps)
        //     break

    case FORMAT.searchable:
        addTransform(transforms, featuresToSearcheables)
        break

    default:
    }

    return compose(...transforms)(features)
}

const getSourceFeatures = createCachedSelector(
    selectSourceFeatures,
    selectFilter,
    selectSort,
    (_, format) => format,
    (_, shouldFilter = false) => shouldFilter,
    (_, shouldSort = false) => shouldSort,
    (features, filter, sort, format, shouldFilter, shouldSort) => (
        extractFeaturesFromSource(
            features,
            filter,
            sort,
            format,
            shouldFilter,
            shouldSort
        )
    )
)({
    keySelector: (_, filter, sort, format, shouldFilter, shouldSort) => {
        const sortKey = shouldSort ? `${sort.orderBy}:${sort.order}` : `${shouldSort}`

        return `${format.value}:${shouldFilter ? stringify(filter) : shouldFilter}:${sortKey}`
    },
    cacheObject: new FifoObjectCache({ cacheSize: CACHE_SIZE })
})

export {
    getSourceFeatures as default,
    selectViewportFeatures,
    FORMAT
}
