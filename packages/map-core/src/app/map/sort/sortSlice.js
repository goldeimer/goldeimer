import { createSlice } from '@reduxjs/toolkit'

import { SortOrder } from './sortFeatures'

const INITIAL_SORT = {
    order: SortOrder.ASC,
    orderBy: 'placeName'
}

const sort = createSlice({
    name: 'sort',
    initialState: INITIAL_SORT,
    reducers: {
        reset: () => INITIAL_SORT,
        set: (state, { order = state.order, orderBy = state.orderBy }) => ({
            order,
            orderBy
        }),
        setOrder: (state, { order = state.order }) => {
            state.order = order
        },
        setOrderBy: (state, { orderBy = state.orderBy }) => {
            state.orderBy = orderBy
        },
        toggleOrder: (state) => {
            if (state.order === SortOrder.ASC) {
                state.order = SortOrder.DESC
                return
            }

            state.order = SortOrder.ASC
        }
    }
})

const SORT = sort.actions

export {
    SORT as default,
    sort
}
