import combineSlices from '@lib/redux/combineSlices'
import createSlice from '@lib/redux/createSlice'

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
