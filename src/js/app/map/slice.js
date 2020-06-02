import context from '@map/context'
import features from '@map/features/features'
import filter from '@map/filter'
import search from '@map/search'
import sort from '@map/features/sort'
import viewport from '@map/MapGl/viewport'

import combineSlices from '@lib/redux/combineSlices'

const map = combineSlices({
    context, features, filter, search, sort, viewport
})

export default map
