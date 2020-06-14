import { createStructuredSelector } from 'reselect'
import { createCachedSelector, FifoMapCache } from 're-reselect'

const selectAltitude = (state) => state.map.view.state.altitude
const selectBearing = (state) => state.map.view.state.bearing
const selectLatitude = (state) => state.map.view.state.latitude
const selectLongitude = (state) => state.map.view.state.longitude
const selectPitch = (state) => state.map.view.state.pitch
const selectZoom = (state) => state.map.view.state.zoom

const selectWidth = (state) => state.map.view.dimensions.width
const selectHeight = (state) => state.map.view.dimensions.height

const selectTransition = createCachedSelector(
    (state) => state.map.view.transition,
    (transition) => transition
)({
    keySelector: (transition) => transition.id,
    cacheObject: new FifoMapCache({ cacheSize: 1 })
})

const selectDimensions = createStructuredSelector({
    width: selectWidth,
    height: selectHeight
})

const selectCoordinates = createStructuredSelector({
    latitude: selectLatitude,
    longitude: selectLongitude
})

const selectViewState = createStructuredSelector({
    altitude: selectAltitude,
    bearing: selectBearing,
    latitude: selectLatitude,
    longitude: selectLongitude,
    pitch: selectPitch,
    zoom: selectZoom
})

export {
    selectAltitude,
    selectBearing,
    selectCoordinates,
    selectDimensions,
    selectHeight,
    selectPitch,
    selectTransition,
    selectViewState,
    selectWidth,
    selectZoom
}
