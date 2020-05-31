import combineSlices from 'util/redux/combineSlices'
import createAsyncSlice from 'util/redux/createAsyncSlice'

const createSegment = ({ name, slices }) => combineSlices(
    Object.entries(slices).reduce((acc, [sliceName, slice]) => ({
        ...acc,
        [sliceName]: createAsyncSlice({
            ...slice,
            name: `${name}/${sliceName}`
        })
    }), {})
)

export default createSegment
