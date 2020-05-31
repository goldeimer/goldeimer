import sortObjects from 'util/array/sortObjects'

const sortFeatures = (features, orderBy, order) => sortObjects(
    features,
    orderBy,
    order,
    'properties'
)

export default sortFeatures
