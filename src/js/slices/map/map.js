import context from 'slices/map/context'
import features from 'slices/map/features'
import filter from 'slices/map/filter'
import search from 'slices/map/search'
import sort from 'slices/map/sort'

import combineSlices from 'utilities/redux/combineSlices'

const map = combineSlices({
    context, features, filter, search, sort
})

export default map
