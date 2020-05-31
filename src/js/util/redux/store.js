import { applyMiddleware, createStore } from 'redux'

import middleware from 'util/redux/middleware'

const makeStore = (reducer) => createStore(
    reducer,
    applyMiddleware(...middleware)
)

export default makeStore
