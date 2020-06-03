import ORDER from '@lib/enum/order'
import sortObjects from '@lib/util/array/sortObjects'

const sortFeatures = (
    features,
    { orderBy = 'name', order = ORDER.asc }
) => sortObjects(
    features,
    orderBy,
    order,
    'properties'
)

export {
    sortFeatures as default,
    ORDER
}
