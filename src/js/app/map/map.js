import combineSlices from '@lib/redux/combineSlices'

import { context } from '@map/context'
import { features } from '@map/features'
import { filter } from '@map/filter'
import { search } from '@map/search'
import { sort } from '@map/sort'
import { viewport } from '@map/viewport'

const map = combineSlices({
    context,
    features,
    filter,
    search,
    sort,
    viewport
})

const MAP = map.actions

export {
    MAP as default,
    map
}
