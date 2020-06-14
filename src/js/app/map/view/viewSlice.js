/// `coordinates`, `transition`, and `zoom` are view state we actively
/// manage. `mapbox-gl-js` emits further stateful values (bearing, pitch,
/// e.g.), passed to us in turn by `ReactMapGl`'s stateless `InteractiveMap`
/// component. These are (so far) not meant to be controlled by our users /
/// the application.
///
/// The `transition` properties `transitionEasing` and
/// `transitionInterpolator` are function reference and object instance,
/// respectively. In their stead, we store a representative enum value,
/// so as to keep the redux state tree serializable for the sake of
/// facilitating persistence.
///
/// @see [State Management](http://visgl.github.io/react-map-gl/docs/get-started/state-management)

import { createSegment, persistReducer } from '@lib/redux'

import transition from '@map/view/transition'

const INITIAL_VIEW_STATE = {
    altitude: 1.5,
    bearing: 0,
    latitude: 50.75,
    longitude: 10,
    pitch: 0,
    zoom: 5
}

const view = createSegment({
    name: 'view',
    slices: {
        dimensions: {
            initialState: { width: 0, height: 0 },
            extraReducers: {
                'view/state/sync': (state, { payload }) => ({
                    width: payload.width || state.width,
                    height: payload.height || state.height
                })
            }
        },
        state: {
            initialState: INITIAL_VIEW_STATE,
            reducers: {
                sync: (state, { payload }) => ({
                    altitude: payload.altitude || state.altitude,
                    bearing: payload.bearing || state.bearing,
                    latitude: payload.latitude || state.latitude,
                    longitude: payload.longitude || state.longitude,
                    pitch: payload.pitch || state.pitch,
                    zoom: payload.zoom || state.zoom
                })
            }
        },
        transition
    }
})

view.reducer = persistReducer(
    view.reducer,
    {
        blacklist: ['dimensions', 'transition'],
        key: 'view'
    }
)

const VIEW = view.actions

export {
    view,
    VIEW
}
