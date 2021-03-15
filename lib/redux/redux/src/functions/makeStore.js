import { applyMiddleware, createStore } from 'redux'
import { reduxBatch } from '@manaflair/redux-batch'
import { persistStore } from 'redux-persist'
import {
    composeWithDevTools
} from 'redux-devtools-extension/logOnlyInProduction'

import middleware from './middleware'

const composeEnhancers = composeWithDevTools({
    // options
})

const makeStore = (reducer) => {
    const store = createStore(
        reducer,
        composeEnhancers(
            reduxBatch,
            applyMiddleware(...middleware),
            reduxBatch
        )
    )

    return { persistor: persistStore(store), store }
}

export default makeStore
