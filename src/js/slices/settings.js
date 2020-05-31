import { createSlice } from '@reduxjs/toolkit'

import { THEME } from 'config/theme'
import combineSlices from 'util/redux/combineSlices'
import makeLocation from 'util/map/location'

const INITIAL_THEME = THEME.Goldeimer
const theme = createSlice({
    name: 'theme',
    initialState: INITIAL_THEME,
    reducers: {
        reset: () => INITIAL_THEME,
        set: (state, { theme: nextTheme }) => nextTheme
    }
})

const INITIAL_HOME = null
const home = createSlice({
    name: 'home',
    initialState: INITIAL_HOME,
    reducers: {
        reset: () => INITIAL_HOME,
        set: (state, {
            latitude,
            longitude,
            placeName = ''
        }) => makeLocation({
            latitude,
            longitude,
            placeName: `Zuhause${placeName.length > 0 ? ': ' : ''}${placeName}`
        })
    }
})

const settings = combineSlices({
    app: combineSlices({ theme }),
    user: combineSlices({ home })
})

export default settings
