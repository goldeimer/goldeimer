import { createSlice } from '@reduxjs/toolkit'

import CONTEXT_TYPE from '@map/context/enumContextType'

const INITIAL_CONTEXT = {
    id: null,
    latitude: 0,
    longitude: 0,
    placeName: '',
    type: CONTEXT_TYPE.noContext.value
}

const context = createSlice({
    name: 'context',
    initialState: INITIAL_CONTEXT,
    reducers: {
        reset: () => INITIAL_CONTEXT,
        set: (_, {
            payload: {
                id,
                latitude,
                longitude,
                placeName,
                type
            }
        }) => ({
            id,
            latitude,
            longitude,
            placeName,
            type
        })
    }
})

const CONTEXT = context.actions

export {
    CONTEXT as default,
    context
}
