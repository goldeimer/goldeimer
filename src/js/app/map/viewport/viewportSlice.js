/// `coordinates`, `transition`, and `zoom` are viewport state we actively
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

import createSegment from '@lib/redux/createSegment'
import generateId from '@lib/util/generateId'

import {
    coordinatesReducer,
    INITIAL_COORDINATES
} from '@map/viewport/coordinates'

import {
    transitionReducers,
    INITIAL_TRANSITION
} from '@map/viewport/transition'

import {
    makeZoomDirectionReducer,
    simpleZoomReducer,
    viewportObjectZoomReducer,
    INITIAL_ZOOM,
    ZOOM_DIRECTION
} from '@map/viewport/zoom'

const INITIAL_SYNC = {
    id: null
}

const makeTransitionCoordinatesReducers = () => Object.fromEntries(
    Object.keys(transitionReducers).map(
        (name) => [`viewport/transition/${name}`, coordinatesReducer]
    )
)

const viewport = createSegment({
    name: 'viewport',
    slices: {
        coordinates: {
            initialState: INITIAL_COORDINATES,
            reducers: {
                reset: () => INITIAL_COORDINATES,
                set: coordinatesReducer
            },
            extraReducers: {
                ...makeTransitionCoordinatesReducers(),
                'search/result/set': coordinatesReducer,
                'viewport/sync/sync': coordinatesReducer
            }
        },
        transition: {
            initialState: INITIAL_TRANSITION,
            reducers: {
                ...transitionReducers
            },
            extraReducers: {
                // 'viewport/zoom/in': transitionReducers.default,
                // 'viewport/zoom/out': transitionReducers.default,
                // 'viewport/zoom/reset': transitionReducers.instant,
                // 'viewport/zoom/set': transitionReducers.instant,
                // 'viewport/zoom/zoom': transitionReducers.default
            }
        },
        sync: {
            initialState: INITIAL_SYNC,
            reducers: {
                reset: () => INITIAL_SYNC,
                sync: {
                    prepare: (value) => {
                        const payload = value || {}
                        payload.id = generateId()

                        return { payload }
                    },
                    reducer: (_, { payload: { id } }) => id
                }
            }
        },
        zoom: {
            initialState: INITIAL_ZOOM,
            reducers: {
                in: makeZoomDirectionReducer(ZOOM_DIRECTION.in),
                out: makeZoomDirectionReducer(ZOOM_DIRECTION.out),
                reset: () => INITIAL_ZOOM,
                set: simpleZoomReducer,
                zoom: simpleZoomReducer
            },
            extraReducers: {
                'search/result/set': () => 13,
                'viewport/sync/sync': viewportObjectZoomReducer
            }
        }
    }
})

const VIEWPORT = viewport.actions

export {
    VIEWPORT as default,
    viewport
}
