import { applyMiddleware, createStore } from 'redux'

import middleware from '@lib/redux/middleware'

const makeStore = (reducer) => createStore(
    reducer,
    applyMiddleware(...middleware)
)

export default makeStore
