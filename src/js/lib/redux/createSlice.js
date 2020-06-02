import {
    createAsyncThunk,
    createSlice as createSliceTk
} from '@reduxjs/toolkit'

const createSlice = ({
    name,
    asyncReducers = {},
    extraReducers = {},
    ...rest
}) => {
    const thunks = Object.entries(asyncReducers).reduce((
        accumulator,
        [typePrefix, { payloadCreator, ...resolutionReducers }]
    ) => {
        const thunk = createAsyncThunk(`${name}/${typePrefix}`, payloadCreator)

        const resolutions = [
            'fulfilled',
            'pending',
            'rejected'
        ].reduce((acc, resolution) => (
            !(resolution in resolutionReducers) ? acc : {
                ...acc,
                [`${thunk[resolution]}`]: resolutionReducers[resolution]
            }
        ), {})

        return {
            resolutions: {
                ...accumulator.resolutions,
                ...resolutions
            },
            thunks: {
                ...accumulator.thunks,
                [typePrefix]: thunk
            }
        }
    }, { resolutions: {}, thunks: {} })

    const slice = createSliceTk({
        name,
        ...rest,
        extraReducers: {
            ...(rest.extraReducers ? rest.extraReducers : {}),
            ...thunks.resolutions
        }
    })

    return { ...slice, actions: { ...slice.actions, ...thunks.thunks } }
}

export default createSlice
