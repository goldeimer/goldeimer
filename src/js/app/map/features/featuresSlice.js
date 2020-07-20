import createSegment from '@lib/redux/createSegment'
import LOADING from '@lib/enum/loading'

import sourceRequest from '@map/features/api'
import {
    mapGlClusterToMarkerState,
    mapGlFeatureToMarkerState
} from '@map/features/transformFeatures'

const INITIAL_SELECTED = null

const INITIAL_SOURCE = {
    error: null,
    features: [],
    loading: LOADING.idle,
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
                        state.loading = LOADING.pending
                    },
                    fulfilled: (_, { payload: { features, receivedAt } }) => ({
                        error: null,
                        features,
                        loading: LOADING.idle,
                        receivedAt
                    }),
                    rejected: (state, { error }) => {
                        state.loading = LOADING.error
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

const FEATURES = segment.actions
export {
    FEATURES as default,
    segment as features
}
