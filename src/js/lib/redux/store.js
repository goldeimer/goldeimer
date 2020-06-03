import { applyMiddleware, compose, createStore } from 'redux'
// TODO: Needed?
import { reduxBatch } from '@manaflair/redux-batch'

import middleware from '@lib/redux/middleware'

const makeStore = (reducer) => createStore(
    reducer,
    compose(
        reduxBatch,
        applyMiddleware(...middleware),
        reduxBatch
    )
)

export default makeStore
