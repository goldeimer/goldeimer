import { createStructuredSelector } from 'reselect'

const selectCoordinates = (state) => state.map.viewport.coordinates
const selectTransition = (state) => state.map.viewport.transition
// TODO: needed?
// const selectSyncId = (state) => state.map.viewport.sync.id
const selectZoom = (state) => state.map.viewport.zoom

const selectViewport = createStructuredSelector({
    coordinates: selectCoordinates,
    transition: selectTransition,
    zoom: selectZoom
})

export {
    selectViewport as default,
    selectCoordinates,
    selectZoom
}
