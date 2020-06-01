import { applyMiddleware, createStore } from 'redux'

import middleware from 'utilities/redux/middleware'

const makeStore = (reducer) => createStore(
    reducer,
    applyMiddleware(...middleware)
)

export default makeStore
