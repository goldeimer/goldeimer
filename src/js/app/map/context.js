import { createSlice } from '@reduxjs/toolkit'

const INITIAL_CONTEXT = null
const context = createSlice({
    name: 'context',
    initialState: INITIAL_CONTEXT,
    reducers: {
        reset: () => INITIAL_CONTEXT,
        set: (_, action) => action.location
    }
})

export default context
