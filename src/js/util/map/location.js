import generateId from 'utilities/generateId'

const makeLocation = ({
    id = generateId(), latitude, longitude, placeName
}) => ({
    id, latitude, longitude, placeName
})

export default makeLocation
