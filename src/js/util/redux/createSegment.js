import combineSlices from 'utilities/redux/combineSlices'
import createAsyncSlice from 'utilities/redux/createAsyncSlice'

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
