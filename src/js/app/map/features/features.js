import sourceRequest from '@map/MapGl/api'
import LOADING from '@lib/enum/loading'
import createSegment from '@lib/redux/createSegment'

import {
    transformGeoJsonFeaturesToMarkerProps
} from '@map/util/transformations'

const INITIAL_SELECTED = null

const INITIAL_SOURCE = {
    error: null,
    features: [],
    loading: LOADING.idle,
    receivedAt: null
}

const INITIAL_VIEWPORT = {
    clusters: [],
    points: []
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
                set: (_, { points }) => ({
                    clusters: [], // TODO
                    points: transformGeoJsonFeaturesToMarkerProps(points)
                })
            }
        }
    }
})

export default segment
