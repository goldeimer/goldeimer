import createSegment from '@lib/redux/createSegment'
import LOADING from '@lib/enum/loading'

import sourceRequest from '@map/features/api'
import { mapGlFeaturesToMarkerState } from '@map/features/transformFeatures'

const INITIAL_SELECTED = null

const INITIAL_SOURCE = {
    error: null,
    features: [],
    loading: LOADING.idle,
    receivedAt: null
}

const INITIAL_VIEWPORT = {
    clusters: [],
    markers: []
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
        viewport: {
            initialState: INITIAL_VIEWPORT,
            reducers: {
                reset: () => INITIAL_VIEWPORT,
                set: (_, { payload: { markers = [] } }) => ({
                    clusters: [], // TODO
                    markers: mapGlFeaturesToMarkerState(markers)
                })
            }
        }
    }
})

const FEATURES = segment.actions
export {
    FEATURES as default,
    segment as features
}
