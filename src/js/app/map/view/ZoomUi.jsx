import React from 'react'
import { PropTypes } from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Slider from '@material-ui/core/Slider'
import Tooltip from '@material-ui/core/Tooltip'

import ZoomInIcon from '@material-ui/icons/ZoomIn'
import ZoomOutIcon from '@material-ui/icons/ZoomOut'

const useStyles = makeStyles(() => ({
    root: {
        height: 300,
        maxHeight: '100%'
    }
}))

const useButtonGroupStyles = makeStyles((theme) => ({
    grouped: {
        padding: 5
    },
    vertical: {
        marginTop: theme.spacing(2)
    },
    groupedContained: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.secondary,
        '&:not(:last-child)': {
            borderColor: '#dddddd'
        },
        '&:hover': {
            backgroundColor: '#eeeeee',
            color: theme.palette.text.secondary
        },
        '&:active': {
            backgroundColor: '#dddddd',
            color: theme.palette.text.secondary
        },
        '& .MuiTouchRipple-root': {
            color: 'rgba(0, 0, 0, 0.2)'
        }
    }
}))

const useSliderStyles = makeStyles((theme) => ({
    rail: {
        height: 6,
        borderRadius: 3,
        '$vertical &': {
            width: 6
        }
    },
    root: {
        flexGrow: 1,
        height: 6,
        '&$vertical': {
            width: 6
        }
    },
    thumb: {
        height: 16,
        width: 16,
        marginTop: -5,
        marginLeft: -8,
        '$vertical &': {
            marginTop: -8,
            marginLeft: -5
        }
    },
    track: {
        height: 6,
        borderRadius: 3,
        '$vertical &': {
            width: 6
        }
    },
    vertical: {}
}))

const ValueLabelComponent = ({ children, open, value }) => (
    <Tooltip open={open} enterTouchDelay={0} placement='left' title={value}>
        {children}
    </Tooltip>
)

ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired
}

const ZoomUi = ({
    currentZoom,
    maxZoom,
    minZoom,
    onChange,
    onZoomIn,
    onZoomOut
}) => {
    const classes = useStyles()
    const buttonGroupClasses = useButtonGroupStyles()
    const sliderClasses = useSliderStyles()

    return (
        <Box
            alignItems='center'
            className={classes.root}
            display='flex'
            flexDirection='column'
        >
            <Slider
                classes={sliderClasses}
                max={maxZoom}
                min={minZoom}
                onChange={onChange}
                orientation='vertical'
                value={currentZoom}
                ValueLabelComponent={ValueLabelComponent}
                valueLabelDisplay='auto'
                valueLabelFormat={(val) => Number.parseFloat(
                    Number.parseFloat(val).toFixed(2)
                )}
            />
            <ButtonGroup
                aria-label='vertical button group'
                classes={buttonGroupClasses}
                orientation='vertical'
                variant='contained'
            >
                <Button onClick={onZoomIn}>
                    <ZoomInIcon />
                </Button>
                <Button onClick={onZoomOut}>
                    <ZoomOutIcon />
                </Button>
            </ButtonGroup>
        </Box>
    )
}

ZoomUi.propTypes = {
    currentZoom: PropTypes.number.isRequired,
    maxZoom: PropTypes.number.isRequired,
    minZoom: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    onZoomIn: PropTypes.func.isRequired,
    onZoomOut: PropTypes.func.isRequired
}

export default ZoomUi
