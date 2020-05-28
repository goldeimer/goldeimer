import sortArrayOfObjects from 'util/sortArrayOfObjects'

const sortFeaturesByProperty = (
    features,
    orderBy,
    order
) => sortArrayOfObjects(
    features,
    orderBy,
    order,
    'properties'
)
export default sortFeaturesByProperty
