import { ease, easeCubic } from 'd3-ease'
import { FlyToInterpolator, LinearInterpolator } from 'react-map-gl'

import createSegment from '@lib/redux/createSegment'
import makeEnum from '@lib/enum/makeEnum'

const TRANSITION_TYPE = makeEnum(['flyTo', 'linear', 'instant'])

const ZOOM_BOUNDARY = {
    max: 18,
    min: 3
}

const INITIAL_COORDINATES = {
    latitude: 50.75,
    longitude: 10
}

const makeTransition = (transitionType) => {
    switch (transitionType) {
    case TRANSITION_TYPE.flyTo:
        return {
            maxDuration: 2000,
            transitionDuration: 'auto',
            transitionEasing: easeCubic,
            transitionInterpolator: new FlyToInterpolator({ speed: 1.2 })
        }

    case TRANSITION_TYPE.linear:
        return {
            transitionDuration: 500,
            transitionEasing: ease,
            transitionInterpolator: new LinearInterpolator()
        }

    default:
        return {
            transitionDuration: 0,
            transitionEasing: (t) => t,
            transitionInterpolator: new LinearInterpolator()
        }
    }
}

const INITIAL_TRANSITION = makeTransition(TRANSITION_TYPE.linear)

const INITIAL_ZOOM = 15

const sanitizeZoom = (zoom) => Math.min(
    ZOOM_BOUNDARY.max,
    Math.max(
        ZOOM_BOUNDARY.min,
        zoom
    )
)

const makeZoomHandler = (isIn) => (state, { payload: { delta = 1 } }) => ({
    ...state,
    ...makeTransition(TRANSITION_TYPE.linear),
    zoom: sanitizeZoom(isIn ? delta - state.zoom : delta + state.zoom)
})

/* eslint-disable-next-line no-extra-parens */
const makeTransitionHandler = (transitionType) => (
    () => makeTransition(transitionType)
)

// TODO: Sanitize.
const coordinatesHandler = (state, { payload }) => payload

const viewport = createSegment({
    name: 'viewport',
    slices: {
        coordinates: {
            initialState: INITIAL_COORDINATES,
            reducers: {
                flyTo: coordinatesHandler,
                reset: (state) => INITIAL_COORDINATES,
                set: coordinatesHandler,
                transitionTo: coordinatesHandler
            }
        },
        zoom: {
            initialState: INITIAL_ZOOM,
            reducers: {
                in: makeZoomHandler(true),
                out: makeZoomHandler(false),
                reset: (state) => INITIAL_ZOOM
            }
        },
        transition: {
            initialState: INITIAL_TRANSITION,
            extraReducers: {
                'coordinates/flyTo': makeTransitionHandler(
                    TRANSITION_TYPE.flyTo
                ),
                'coordinates/reset': makeTransitionHandler(
                    TRANSITION_TYPE.instant
                ),
                'coordinates/set': makeTransitionHandler(
                    TRANSITION_TYPE.instant
                ),
                'coordinates/transitionTo': makeTransitionHandler(
                    TRANSITION_TYPE.linear
                ),
                'zoom/in': makeTransitionHandler(TRANSITION_TYPE.linear),
                'zoom/out': makeTransitionHandler(TRANSITION_TYPE.linear),
                'zoom/reset': makeTransitionHandler(TRANSITION_TYPE.instant)
            }
        }
    }
})

export default viewport
