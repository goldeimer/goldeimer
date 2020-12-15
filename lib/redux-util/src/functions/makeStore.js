import { applyMiddleware, compose, createStore } from 'redux'
import { reduxBatch } from '@manaflair/redux-batch'
import { persistStore } from 'redux-persist'

import middleware from './middleware'

const makeStore = (reducer) => {
    const store = createStore(
        reducer,
        compose(
            reduxBatch,
            applyMiddleware(...middleware),
            reduxBatch
        )
    )

    return { persistor: persistStore(store), store }
}

export default makeStore
