import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import CONTEXT, { PropTypeContext } from '@map/context'
import { PropTypeColor } from '@map/features'

import Box from '@material-ui/core/Box'
import ButtonBase from '@material-ui/core/ButtonBase'

import FeatureMarkerDetailCard from '@map/MapGl/Markers/FeatureMarkerDetailCard'
import Marker, { ANCHOR_TO } from '@map/MapGl/Markers/Marker'
import MarkerBackgroundIcon from '@map/icons/map/MarkerBackgroundIcon'

const colorOrFallback = (color) => color || '#757575'

const useStyles = makeStyles(({ palette: { getContrastText } }) => ({
    root: () => ({
        color: '#000'
    }),
    background: ({ color }) => ({
        color: colorOrFallback(color.main),
        filter: 'drop-shadow(0 0 1px rgba(255, 255, 255, 1))',
        '$root:hover &, $root:focus &': {
            color: colorOrFallback(color.light)
        },
        '$root:active &': {
            color: colorOrFallback(color.light)
        }
    }),
    icon: ({ color }) => ({
        color: getContrastText(colorOrFallback(color.main))
    })
}), { name: 'FeatureMarker' })

const FeatureMarkerComponent = ({
    color,
    context,
    iconComponent: IconComponent
}) => {
    const classes = useStyles({ color })
    const dispatch = useDispatch()

    const handleClick = useCallback(
        () => {
            if (context !== null) {
                dispatch(CONTEXT.set(context))
            }
        },
        [context, dispatch]
    )

    return (
        <ButtonBase
            // centerRipple // satisfactory?
            className={classes.root}
            disableRipple
            disableTouchRipple
            onClick={handleClick}
        >
            <Box
                fontSize='2rem'
                position='relative'
                display='flex'
                flexShrink={1}
            >
                <MarkerBackgroundIcon
                    className={classes.background}
                    fontSize='inherit'
                />
                <Box
                    position='absolute'
                    fontSize='1rem'
                    top={4}
                    left={8}
                    display='flex'
                    flexShrink={1}
                >
                    <IconComponent
                        className={classes.icon}
                        fontSize='inherit'
                    />
                </Box>
            </Box>
        </ButtonBase>
    )
}

FeatureMarkerComponent.propTypes = {
    color: PropTypeColor,
    context: PropTypeContext,
    iconComponent: PropTypes.elementType.isRequired
}

FeatureMarkerComponent.defaultProps = {
    color: null,
    context: null
}

const FeatureMarker = (props) => (
    <Marker
        {...props}
        anchorTo={ANCHOR_TO.top}
        component={FeatureMarkerComponent}
        defaultDimensions={{ height: 32, width: 32 }}
        renderDetailCard={(detail) => <FeatureMarkerDetailCard {...detail} />}
    />
)

FeatureMarker.propTypes = Marker.propTypes

FeatureMarker.defaultProps = Marker.defaultProps

export default memo(FeatureMarker)
