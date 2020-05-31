import { combineReducers } from 'redux'

const combineSlices = (slices) => {
    const combined = Object.entries(slices).reduce((acc, slice) => {
        const [
            name,
            { actions, reducer }
        ] = slice

        return {
            actions: {
                ...acc.actions,
                [name]: actions
            },
            reducers: {
                ...acc.reducers,
                [name]: reducer
            }
        }
    }, { actions: {}, reducers: {} })

    return {
        reducer: combineReducers(combined.reducers),
        actions: combined.actions
    }
}

export default combineSlices
