import combineSlices from './combineSlices'
import createSlice from './createSlice'

const createSegment = ({ name, slices }) => combineSlices(
    Object.entries(slices).reduce((acc, [sliceName, slice]) => ({
        ...acc,
        [sliceName]: createSlice({
            ...slice,
            name: `${name}/${sliceName}`
        })
    }), {})
)

export default createSegment
