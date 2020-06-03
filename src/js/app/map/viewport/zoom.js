import makeEnum from '@lib/enum/makeEnum'
import payload from '@lib/redux/payload'
import { sanitizeWithinRange } from '@lib/util/sanitizeNumericValue'

const INITIAL_ZOOM = 5

const DEFAULT_DELTA = 1

const ZOOM_DIRECTION = makeEnum(['in', 'out'])

const ZOOM_LIMIT = {
    max: 18,
    min: 3
}

const sanitizeZoom = (zoom) => sanitizeWithinRange(
    zoom,
    ZOOM_LIMIT.min,
    ZOOM_LIMIT.max
)

const simpleReducer = payload(sanitizeZoom)

const transformDirectionToSign = (direction) => (
    ZOOM_DIRECTION.in.is(direction) ? 1 : -1
)

const makeDirectionReducer = (direction) => {
    const sign = transformDirectionToSign(direction)

    return (state, { payload: zoom }) => {
        const delta = zoom || DEFAULT_DELTA

        return sanitizeZoom(sign * delta + state)
    }
}

const viewportObjectReducer = payload(({ zoom }) => sanitizeZoom(zoom))

export {
    makeDirectionReducer as makeZoomDirectionReducer,
    sanitizeZoom,
    simpleReducer as simpleZoomReducer,
    viewportObjectReducer as viewportObjectZoomReducer,
    INITIAL_ZOOM,
    ZOOM_DIRECTION,
    ZOOM_LIMIT
}
