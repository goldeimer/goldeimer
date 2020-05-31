import makeUuid from 'react-uuid'

const makeLocation = ({
    latitude, longitude, placeName, uuid = makeUuid()
}) => ({
    latitude, longitude, placeName, uuid
})

export default makeLocation
