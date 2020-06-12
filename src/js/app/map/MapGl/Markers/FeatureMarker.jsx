import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

import { hexToRgba } from '@lib/util/color'

import Box from '@material-ui/core/Box'
import ButtonBase from '@material-ui/core/ButtonBase'

import Marker, { ANCHOR_TO } from '@map/MapGl/Markers/Marker'
import MarkerBackgroundIcon from '@map/icons/map/MarkerBackgroundIcon'

const getColor = (color) => (
    color && color !== null ? color : '#757575'
)

const useStyles = makeStyles(({ palette }) => ({
    background: ({ color: mayBeColor }) => {
        const color = getColor(mayBeColor)
        const contrast = palette.getContrastText(getColor(color))

        return {
            color,
            '&:hover': {
                '& path': {
                    stroke: hexToRgba(contrast, 0.5),
                    strokeWidth: 1
                }
            },
            '&:active': {
                stroke: hexToRgba(contrast, 0.8),
                strokeWidth: 1
            }
        }
    },
    icon: ({ color }) => ({
        color: palette.getContrastText(getColor(color))
    })
}))

const FeatureMarkerComponent = memo(({
    color,
    iconComponent: IconComponent
}) => {
    const classes = useStyles({ color })

    return (
        <ButtonBase
            // TODO: Fix.
            disableRipple
        >
            <Box
                fontSize='3rem'
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
                    fontSize='1.5rem'
                    top={6}
                    left={12}
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
})

FeatureMarkerComponent.propTypes = {
    color: PropTypes.string,
    iconComponent: PropTypes.elementType.isRequired
}

FeatureMarkerComponent.defaultProps = {
    color: null
}

const FeatureMarker = (props) => (
    <Marker
        {...props}
        anchorTo={ANCHOR_TO.top}
        component={FeatureMarkerComponent}
        defaultDimensions={{ height: 48, width: 48 }}
    />
)

FeatureMarker.propTypes = Marker.propTypes

FeatureMarker.defaultProps = Marker.defaultProps

export default FeatureMarker
