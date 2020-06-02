import React from 'react'
import { PropTypes } from 'prop-types'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import ZoomInIcon from '@material-ui/icons/ZoomIn'
import ZoomOutIcon from '@material-ui/icons/ZoomOut'

import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles((theme) => {
    const backgroundColor = theme.palette.primary.main

    return {
        grouped: {
            backgroundColor,
            color: theme.palette.getContrastText(backgroundColor),
            '&:hover, &:focus': {
                backgroundColor: theme.palette.primary.dark
            }
        }
    }
})

const ZoomUi = ({ onZoomIn, onZoomOut }) => {
    const classes = useStyles()
    const theme = useTheme()
    const isSmallButton = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <Box>
            <IconButton>
                <ZoomInIcon />
            </IconButton>
            <IconButton>
                <ZoomOutIcon />
            </IconButton>
        </Box>
    )
}

ZoomUi.propTypes = {
    onZoomIn: PropTypes.func.isRequired,
    onZoomOut: PropTypes.func.isRequired
}

export default ZoomUi
