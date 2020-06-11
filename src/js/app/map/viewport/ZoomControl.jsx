import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Box from '@material-ui/core/Box'

import useViewportEdgeStyles from '@lib/styles/useViewportEdgeStyles'

import VIEWPORT, { ZOOM_LIMIT } from '@map/viewport'
import { selectZoom } from '@map/viewport/selectViewport'

import ZoomUi from '@map/viewport/ZoomUi'

const ZoomControl = () => {
    const classes = useViewportEdgeStyles()
    const dispatch = useDispatch()

    const currentZoom = useSelector(selectZoom)

    const handleChange = (_ /* event */, level) => dispatch(
        VIEWPORT.zoom.zoom(level)
    )

    const handleZoomIn = () => dispatch(VIEWPORT.zoom.in())

    const handleZoomOut = () => dispatch(VIEWPORT.zoom.out())

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
