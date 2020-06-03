import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { instantiateTransition } from '@map/viewport/transition'
import selectViewport from '@map/viewport/selectViewport'
import VIEWPORT from '@map/viewport/viewportSlice'

const INITIAL_MAP_GL_INTERNAL_STATE = {}

const useViewport = () => {
    const dispatch = useDispatch()
    const latestHandledTransitionId = useRef(null)

    // *Some* of `mapbox-gl-js`' internally calculated (next) viewport state is
    // managed by us and saved in the redux store. Other, (potentially)
    // stateful values are not.
    const [
        mapGlInternalState,
        setMapGlInternalState
    ] = useState(INITIAL_MAP_GL_INTERNAL_STATE)

    const handleViewportChange = (nextViewport) => {
        setMapGlInternalState(nextViewport)
        dispatch(VIEWPORT.sync.sync(nextViewport))
    }

    const transformTransitionState = (state) => {
        if (latestHandledTransitionId.current === state.id) {
            return {}
        }

        latestHandledTransitionId.current = state.id

        return instantiateTransition(state)
    }

    const {
        coordinates,
        transition,
        zoom
    } = useSelector(selectViewport)

    const viewport = {
        ...mapGlInternalState,
        ...coordinates,
        ...transformTransitionState(transition),
        zoom
    }

    return [viewport, handleViewportChange]
}

export default useViewport
