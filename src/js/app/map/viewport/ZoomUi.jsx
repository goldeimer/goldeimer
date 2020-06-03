import React from 'react'
import { PropTypes } from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'

import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import Slider from '@material-ui/core/Slider'

import ZoomInIcon from '@material-ui/icons/ZoomIn'
import ZoomOutIcon from '@material-ui/icons/ZoomOut'

const useStyles = makeStyles((theme) => ({
    root: {
        maxHeight: 400
    },
    iconButton: {
        backgroundColor: theme.palette.action.selected,
        color: theme.palette.getContrastText('#fff'),
        marginTop: theme.spacing(1),
        '& .MuiSvgIcon-root': {
            opacity: 0.7
        },
        '&:hover, &:focus': {
            backgroundColor: theme.palette.action.disabled,
            color: theme.palette.primary.main,
            '& .MuiSvgIcon-root': {
                opacity: 0.9
            }
        }
    },
    slider: {
        flexGrow: 1
    }
}))

const MapControlIconButton = (props) => {
    const classes = useStyles()

    return (
        <IconButton className={classes.iconButton} {...props} />
    )
}

const ZoomUi = ({
    currentZoom,
    maxZoom,
    minZoom,
    onChange,
    onZoomIn,
    onZoomOut
}) => (
    <Box display='flex' flexDirection='column'>
        <Slider
            max={maxZoom}
            min={minZoom}
            onChange={onChange}
            orientation='vertical'
            value={currentZoom}
            valueLabelDisplay='auto'
        />
        <MapControlIconButton onClick={onZoomIn}>
            <ZoomInIcon />
        </MapControlIconButton>
        <MapControlIconButton onClick={onZoomOut}>
            <ZoomOutIcon />
        </MapControlIconButton>
    </Box>
)

ZoomUi.propTypes = {
    currentZoom: PropTypes.number.isRequired,
    maxZoom: PropTypes.number.isRequired,
    minZoom: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    onZoomIn: PropTypes.func.isRequired,
    onZoomOut: PropTypes.func.isRequired
}

export default ZoomUi
