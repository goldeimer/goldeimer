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

const CONTEXT = context.actions

export {
    CONTEXT as default,
    context
}
