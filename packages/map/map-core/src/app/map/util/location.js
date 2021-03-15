import { generateId } from '@goldeimer/js-util'

const makeLocation = ({
    id = generateId(), latitude, longitude, placeName
}) => ({
    id, latitude, longitude, placeName
})

export default makeLocation
