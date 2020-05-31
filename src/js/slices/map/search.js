import { createSlice } from '@reduxjs/toolkit'
import makeUuid from 'react-uuid'

import geocodingRequest from 'api/map/geocoding'
import combineSlices from 'util/redux/combineSlices'
import createAsyncSlice from 'util/redux/createAsyncSlice'

const INITIAL_GEOCODING = []
const geocoding = createAsyncSlice({
    name: 'geocoding',
    initialState: INITIAL_GEOCODING,
    reducers: {
        reset: () => INITIAL_GEOCODING,
        set: (_, { candidates }) => candidates
    },
    asyncReducers: {
        fetch: {
            payloadCreator: async (query) => {
                const result = await geocodingRequest(query)
                return result
            },
            fulfilled: (_, { payload }) => payload
        }
    }
})

const INITIAL_QUERY = ''
const query = createAsyncSlice({
    name: 'query',
    initialState: INITIAL_QUERY,
    reducers: {
        reset: () => INITIAL_QUERY,
        set: ({ query: qry }) => qry
    },
    extraReducers: {
        submit: {
            payloadCreator: (qry, { dispatch }) => {
                if (qry.length < 3) {
                    return
                }
                dispatch(geocoding.fetch(qry))
            },
            pending: (_, { meta: { arg: qry } }) => qry
        }
    }
})

const INITIAL_RESULT = {
    current: null,
    history: []
}
const result = createSlice({
    name: 'result',
    initialState: INITIAL_RESULT,
    reducers: {
        add: (state, { query: qry, result: res, uuid = makeUuid() }) => {
            state.history.unshift({
                qry,
                res,
                uuid
            })
        },
        clear: () => INITIAL_RESULT,
        reset: (state, { result: current }) => {
            state.current = INITIAL_RESULT.current
        },
        set: (state, { result: current }) => { state.current = current }
    }
})

const search = combineSlices({ geocoding, query, result })

export default search
