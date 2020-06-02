import React from 'react'
import { useDispatch } from 'react-redux'

import Box from '@material-ui/core/Box'

import { useEvery100Ms } from '@lib/hooks/useThrottle'
import useViewportEdgeStyles from '@lib/styles/useViewportEdgeStyles'

import ZoomUi from '@map/MapGl/ZoomControl/ZoomUi'

import APP from '@app/app'

const { viewport } = APP.map

const ZoomControl = () => {
    const classes = useViewportEdgeStyles()
    const dispatch = useDispatch()

    const handleZoom = useEvery100Ms((isIn = true) => (
        isIn
            ? dispatch(viewport.zoom.in())
            : dispatch(viewport.zoom.out())
    ))

    const handleZoomIn = () => handleZoom(true)

    const handleZoomOut = () => handleZoom(false)

    return (
        <Box className={classes.bottomRight}>
            <ZoomUi onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
        </Box>
    )
}

export default ZoomControl
