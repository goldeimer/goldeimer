import { persistReducer as persistReducerRp } from 'redux-persist'
import localForage from 'localforage'

const defaultPersistConfig = {
    key: 'root',
    storage: localForage,
    transforms: []
}

const makePersistConfig = (config = {}) => ({
    ...defaultPersistConfig,
    ...config
})

const persistReducer = (reducer, config = {}) => persistReducerRp(
    makePersistConfig(config),
    reducer
)

export default persistReducer
