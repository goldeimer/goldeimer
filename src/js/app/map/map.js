import { combineSlices, persistReducer } from '@lib/redux'

import { context } from '@map/context'
import { features } from '@map/features'
import { filter } from '@map/filter'
import { search } from '@map/search'
import { sort } from '@map/sort'
import { view } from '@map/view'

const map = combineSlices({
    context,
    features,
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
