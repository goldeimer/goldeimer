import {
    sortObjects,
    SortOrder
} from '@goldeimer/js-util'

const sortFeatures = (
    features,
    { orderBy = 'placeName', order = SortOrder.ASC }
) => sortObjects(
    features,
    orderBy,
    order,
    'properties'
)

export {
    sortFeatures as default,
    SortOrder
}
