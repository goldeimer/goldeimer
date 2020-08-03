import localForage from 'localforage'
import { persistReducer as persistReducerRp } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

const defaultPersistConfig = {
    key: 'root',
    stateReconciler: autoMergeLevel2,
    storage: localForage,
    transforms: [],
    version: 2
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
