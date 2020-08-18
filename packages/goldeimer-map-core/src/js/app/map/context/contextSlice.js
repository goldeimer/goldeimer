import { createSlice } from '@reduxjs/toolkit'

import { CONTEXT_TYPE } from '@map/enum'

const DEFAULT_CONTEXT = {
    id: null,
    latitude: 0,
    longitude: 0,
    placeName: '',
    type: CONTEXT_TYPE.noContext.value
}

const context = createSlice({
    name: 'context',
    initialState: DEFAULT_CONTEXT,
    reducers: {
        reset: () => DEFAULT_CONTEXT,
        set: {
            prepare: (value) => ({
                payload: {
                    ...value,
                    setAt: Date.now()
                }
            }),
            reducer: (_, {
                payload: {
                    id,
                    latitude,
                    longitude,
                    placeName,
                    setAt,
                    type
                }
            }) => ({
                id,
                latitude,
                longitude,
                placeName,
                setAt,
                type
            })
        }
    }
})

const CONTEXT = context.actions

export {
    CONTEXT as default,
    context,
    DEFAULT_CONTEXT
}
