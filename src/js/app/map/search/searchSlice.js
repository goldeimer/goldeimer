import { createAsyncThunk, createSegment, payloadIdentity } from '@lib/redux'
import generateId from '@lib/util/generateId'

import geocodingRequest from '@map/search/geocoding'
import { MIN_ACTIONABLE_QUERY_LENGTH } from '@map/search/searchConfig'

const INITIAL_GEOCODING = {
    currentRequestId: null,
    results: []
}

const INITIAL_QUERY = ''

const INITIAL_RESULT = {
    current: null,
    history: []
}

const fetchGeocoding = createAsyncThunk(
    'search/geocoding/fetch',
    async (query) => {
        const result = await geocodingRequest(query)
        return result
    }
)

const search = createSegment({
    name: 'search',
    slices: {
        geocoding: {
            initialState: INITIAL_GEOCODING,
            reducers: {
                reset: () => INITIAL_GEOCODING
            },
            extraReducers: {
                [fetchGeocoding.pending]: (state, { meta: { requestId } }) => {
                    state.currentRequestId = requestId
                },
                [fetchGeocoding.fulfilled]: (
                    state,
                    { meta: { requestId }, payload }
                ) => {
                    if (state.currentRequestId === requestId) {
                        state.results = payload
                    }
                }
            }
        },
        query: {
            initialState: INITIAL_QUERY,
            reducers: {
                reset: () => INITIAL_QUERY
            },
            asyncReducers: {
                set: {
                    payloadCreator: async (query, { dispatch }) => {
                        const trimmed = query.trim()
                        if (trimmed.length >= MIN_ACTIONABLE_QUERY_LENGTH) {
                            // TODO: Debounce?
                            dispatch(fetchGeocoding(trimmed))
                        }

                        return query
                    },
                    fulfilled: payloadIdentity
                }
            }
        },
        result: {
            initialState: INITIAL_RESULT,
            reducers: {
                add: {
                    prepare: (value) => ({
                        payload: {
                            id: generateId(),
                            ...value,
                            searchedAt: Date.now()
                        }
                    }),
                    reducer: (
                        state,
                        {
                            payload: {
                                id, query, result, searchedAt
                            }
                        }
                    ) => {
                        // TODO: Better validation. (In the prepare method?)
                        if (!query || !result) {
                            return
                        }

                        state.history.unshift({
                            id,
                            query,
                            result: {
                                type: result.type.value,
                                ...result
                            },
                            searchedAt
                        })
                    }
                },
                clear: () => INITIAL_RESULT,
                reset: (state) => {
                    state.current = INITIAL_RESULT.current
                },
                set: (state, { payload }) => { state.current = payload }
            }
        }
    }
})

search.actions.geocoding.fetch = fetchGeocoding

const SEARCH = search.actions

export {
    SEARCH as default,
    search
}
