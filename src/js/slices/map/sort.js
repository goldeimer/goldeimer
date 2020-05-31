import { createSlice } from '@reduxjs/toolkit'

import SORT_ORDER from 'enum/sortOrder'

const INITIAL_SORT = {
    order: SORT_ORDER.asc,
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
            if (state.order === SORT_ORDER.asc) {
                state.order = SORT_ORDER.desc
                return
            }

            state.order = SORT_ORDER.asc
        }
    }
})

export default sort
