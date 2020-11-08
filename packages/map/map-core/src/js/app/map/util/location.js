import generateId from '@lib/util/generateId'

const makeLocation = ({
    id = generateId(), latitude, longitude, placeName
}) => ({
    id, latitude, longitude, placeName
})

export default makeLocation
