import { combineSlices, persistReducer } from '@goldeimer/redux-util'

import { context } from './context'
import { config } from './config'
import { feature } from './feature'
import { filter } from './filter'
import { search } from './search'
import { sort } from './sort'
import { view } from './view'

const map = combineSlices({
    config,
    context,
    feature,
    filter,
    search,
    sort,
    view
})

map.reducer = persistReducer(
    map.reducer,
    {
        blacklist: ['search', 'view'],
        key: 'map'
    }
)

const MAP = map.actions

export {
    MAP as default,
    map
}
