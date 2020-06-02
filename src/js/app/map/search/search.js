import combineSlices from '@lib/redux/combineSlices'
import createSlice from '@lib/redux/createSlice'
import geocodingRequest from '@map/search/geocoding'
import generateId from '@lib/util/generateId'

const INITIAL_GEOCODING = []
const geocoding = createSlice({
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
const query = createSlice({
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
        add: {
            prepare: (payload) => ({
                id: generateId(),
                ...payload,
                searchedAt: Date.now()
            }),
            reducer: (
                state,
                {
                    payload: {
                        id, query: qry, result: res, searchedAt
                    }
                }
            ) => {
                state.history.unshift({
                    id,
                    qry,
                    res,
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
})

const search = combineSlices({ geocoding, query, result })

export default search
