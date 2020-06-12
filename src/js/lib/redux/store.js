import { applyMiddleware, compose, createStore } from 'redux'
import { reduxBatch } from '@manaflair/redux-batch'
import { persistReducer, persistStore } from 'redux-persist'
import localForage from 'localforage'

import middleware from '@lib/redux/middleware'

const persistConfig = {
    key: 'root',
    storage: localForage,
    transforms: []
}

const persistReducerWithConfig = (reducer) => persistReducer(
    persistConfig,
    reducer
)

let persistedReducer = null

const makeStore = (reducer) => {
    persistedReducer = persistReducerWithConfig(reducer)

    const store = createStore(
        persistedReducer,
        compose(
            reduxBatch,
            applyMiddleware(...middleware),
            reduxBatch
        )
    )

    return { persistor: persistStore(store), store }
}

export default makeStore
