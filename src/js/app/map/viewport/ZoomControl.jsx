import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { throttle } from 'throttle-debounce'

import Box from '@material-ui/core/Box'

import { ZOOM_LIMIT } from '@map/viewport'
import { selectZoom } from '@map/viewport/selectViewport'

import useViewportEdgeStyles from '@lib/styles/useViewportEdgeStyles'

import ZoomUi from '@map/viewport/ZoomUi'

import APP from '@app/app'

const { viewport } = APP.map

const ZoomControl = () => {
    const classes = useViewportEdgeStyles()
    const dispatch = useDispatch()

    const currentZoom = useSelector(selectZoom)

    const handleChange = throttle(
        100,
        (_ /* event */, level) => dispatch(viewport.zoom.zoom(level))
    )

    const handleZoomIn = () => throttle(
        100,
        () => dispatch(viewport.zoom.in())
    )

    const handleZoomOut = () => throttle(
        100,
        () => dispatch(viewport.zoom.out())
    )

    return (
        <Box className={classes.bottomRight}>
            <ZoomUi
                currentZoom={currentZoom}
                maxZoom={ZOOM_LIMIT.max}
                minZoom={ZOOM_LIMIT.min}
                onChange={handleChange}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
            />
        </Box>
    )
}

export default ZoomControl
