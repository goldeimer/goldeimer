import { createSlice } from '@reduxjs/toolkit'

import ORDER from '@lib/enum/order'

const INITIAL_SORT = {
    order: ORDER.asc,
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
            if (state.order === ORDER.asc) {
                state.order = ORDER.desc
                return
            }

            state.order = ORDER.asc
        }
    }
})

export default sort
