import { compose } from 'redux'
import { createCachedSelector, FifoMapCache } from 're-reselect'
import stringify from 'json-stringify-deterministic'

import { filterFeatures, selectFilter } from '@map/filter'
import { sortFeatures, selectSort } from '@map/sort'

import FEATURE_FORMAT from '@map/features/enumFeatureFormat'
import {
    getFeatureTransform,
    getFeaturesTransform
} from '@map/features/transformFeatures'

const CACHE_SIZE = {
    source: 50,
    featureById: 30,
    featuresById: 20
}

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

    addTransform(transforms, getFeaturesTransform(format))

    return compose(...transforms)(features)
}

const selectSourceFeaturesWithOptions = createCachedSelector(
    selectSourceFeatures,
    selectFilter,
    selectSort,
    (_, format) => format,
    (_, __, shouldFilter) => shouldFilter,
    (_, __, ___, shouldSort) => shouldSort,
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
    cacheObject: new FifoMapCache({ cacheSize: CACHE_SIZE.source })
})

const getSourceFeatures = (
    format = FEATURE_FORMAT.geojson,
    shouldFilter = false,
    shouldSort = false
) => (state) => selectSourceFeaturesWithOptions(
    state,
    format,
    shouldFilter,
    shouldSort
)

const getSourceFeatureLookup = getSourceFeatures(FEATURE_FORMAT.lookup)

const getSearchableSourceFeatures = getSourceFeatures(
    FEATURE_FORMAT.searchable,
    true
)

const selectFeatureById = createCachedSelector(
    getSourceFeatureLookup,
    (_, id) => id,
    (_, __, format) => format,
    (lookup, id, format) => {
        const feature = lookup.get(id)

        if (!feature) {
            return null
        }

        return getFeatureTransform(format)(feature)
    }
)({
    keySelector: (_, id, format) => `${id}:${format.value}`,
    cacheObject: new FifoMapCache({ cacheSize: CACHE_SIZE.featureById })
})

const selectFeaturesById = createCachedSelector(
    getSourceFeatureLookup,
    (_, ids) => ids,
    (_, __, format) => format,
    (lookup, ids, format) => {
        const transform = getFeatureTransform(format)

        const features = ids.reduce((acc, id) => {
            const feature = lookup.get(id)

            if (!feature) {
                return acc
            }

            return [...acc, transform(feature)]
        }, [])

        return features
    }
)({
    keySelector: (_, ids, format) => `${ids.join(',')}:${format.value}`,
    cacheObject: new FifoMapCache({ cacheSize: CACHE_SIZE.featuresById })
})

/* eslint-disable-next-line no-extra-parens */
const getFeatureById = (id, format = FEATURE_FORMAT.geojson) => (
    (state) => selectFeatureById(state, id, format)
)

/* eslint-disable-next-line no-extra-parens */
const getFeaturesById = (ids, format = FEATURE_FORMAT.geojson) => (
    (state) => selectFeaturesById(state, ids, format)
)

export {
    getSourceFeatures as default,
    FEATURE_FORMAT,
    getFeatureById,
    getFeaturesById,
    getSearchableSourceFeatures,
    getSourceFeatureLookup,
    selectViewportFeatures
}
