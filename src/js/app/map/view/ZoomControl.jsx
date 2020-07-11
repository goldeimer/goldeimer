import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Box from '@material-ui/core/Box'

import useEdgeStyles from '@lib/styles/useEdgeStyles'

import VIEW, { sanitizeZoom, selectZoom, ZOOM_LIMIT } from '@map/view'

import ZoomUi from '@map/view/ZoomUi'

const ZoomControl = () => {
    const classes = useEdgeStyles()
    const dispatch = useDispatch()

    const currentZoom = useSelector(selectZoom)

    const dispatchZoom = (zoom, delta = 1) => dispatch(
        VIEW.transition.zoomTo({ zoom: sanitizeZoom(zoom), delta })
    )

    const handleChange = (_ /* event */, zoom) => dispatchZoom(
        zoom,
        currentZoom - zoom
    )

    const handleZoomIn = () => dispatchZoom(currentZoom + 1)

    const handleZoomOut = () => dispatchZoom(currentZoom - 1)

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
