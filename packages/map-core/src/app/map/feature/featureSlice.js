import { LoadingState } from '@goldeimer/js-util'
import { createSegment } from '@goldeimer/redux-util'

import sourceRequest from './api'
import {
    mapGlClusterToMarkerState,
    mapGlFeatureToMarkerState
} from './transformFeatures'

const INITIAL_SELECTED = null

const INITIAL_SOURCE = {
    error: null,
    features: [],
    loading: LoadingState.IDLE,
    receivedAt: null
}

const INITIAL_VIEW = {
    clusters: [],
    highlightId: null,
    markers: []
}

const prepareMapGlFeatures = (features) => {
    const addedClusters = new Set()
    const addedMarkers = new Set()

    return {
        payload: features.reduce((acc, feature) => {
            if (feature.properties.cluster === true) {
                if (addedClusters.has(
                    feature.properties.cluster_id
                )) {
                    return acc
                }

                addedClusters.add(feature.properties.cluster_id)

                return {
                    ...acc,
                    clusters: [
                        ...acc.clusters,
                        mapGlClusterToMarkerState(feature)
                    ]
                }
            }

            if (addedMarkers.has(
                feature.properties.id
            )) {
                return acc
            }

            addedMarkers.add(feature.properties.id)

            return {
                ...acc,
                markers: [
                    ...acc.markers,
                    mapGlFeatureToMarkerState(feature)
                ]
            }
        }, { clusters: [], markers: [] })
    }
}

const segment = createSegment({
    name: 'features',
    slices: {
        selected: {
            initialState: INITIAL_SELECTED,
            reducers: {
                reset: () => INITIAL_SELECTED,
                set: (_, action) => action.id
            }
        },
        source: {
            initialState: INITIAL_SOURCE,
            reducers: {
                reset: () => INITIAL_SOURCE
            },
            asyncReducers: {
                fetch: {
                    payloadCreator: async () => {
                        const features = await sourceRequest()
                        return { features, receivedAt: Date.now() }
                    },
                    pending: (state) => {
                        state.loading = LoadingState.PENDING
                    },
                    fulfilled: (_, { payload: { features, receivedAt } }) => ({
                        error: null,
                        features,
                        loading: LoadingState.IDLE,
                        receivedAt
                    }),
                    rejected: (state, { error }) => {
                        state.loading = LoadingState.ERROR
                        state.error = error
                    }
                }
            }
        },
        view: {
            initialState: INITIAL_VIEW,
            reducers: {
                push: {
                    prepare: prepareMapGlFeatures,
                    reducer: (state, {
                        payload: { clusters = [], markers = [] }
                    }) => {
                        state.clusters.push(...clusters)
                        state.markers.push(...markers)
                    }
                },
                removeCluster: (state, { payload: id }) => ({
                    ...state,
                    clusters: state.clusters.filter(
                        (cluster) => cluster.id !== id
                    )
                }),
                reset: () => INITIAL_VIEW,
                set: {
                    prepare: prepareMapGlFeatures,
                    reducer: (state, {
                        payload: { clusters = [], markers = [] }
                    }) => {
                        const existingClusters = new Set()
                        const existingMarkers = new Set()

                        state.clusters = state.clusters.filter((cluster) => {
                            const found = clusters.findIndex(
                                (thisCluster) => thisCluster.id === cluster.id
                            ) !== -1

                            if (found) {
                                existingClusters.add(cluster.id)
                            }

                            return found
                        }).concat(clusters.filter(
                            (cluster) => !existingClusters.has(cluster.id)
                        ))

                        state.markers = state.markers.filter((marker) => {
                            const found = markers.findIndex(
                                (thisMarker) => thisMarker.id === marker.id
                            ) !== -1

                            if (found) {
                                existingMarkers.add(marker.id)
                            }

                            return found
                        }).concat(markers.filter(
                            (marker) => !existingMarkers.has(marker.id)
                        ))
                    }
                },
                setHighlightId: (state, { payload: id }) => {
                    state.highlightId = id
                },
                unsetHighlightId: (state, { payload: id }) => {
                    if (state.highlightId === id) {
                        state.highlightId = null
                    }
                }
            }
        }
    }
})

const FEATURE = segment.actions
export {
    FEATURE as default,
    segment as feature
}
