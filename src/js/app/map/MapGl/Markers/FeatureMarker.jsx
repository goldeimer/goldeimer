import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React, {
    forwardRef,
    memo,
    useCallback,
    useEffect,
    useRef
} from 'react'
import { useDispatch } from 'react-redux'

import { rgbCssToRgbValues } from '@lib/util/color'

import CONTEXT, {
    PropTypeContext,
    PropTypeContextInfo
} from '@map/context'
import { PropTypeColor } from '@map/features'

import Box from '@material-ui/core/Box'
import ButtonBase from '@material-ui/core/ButtonBase'

import { D3Transition } from '@lib/transition'

import FeatureMarkerDetailCard from '@map/MapGl/Markers/FeatureMarkerDetailCard'
import Marker, { ANCHOR_TO } from '@map/MapGl/Markers/Marker'
import { transitionContextMarker } from '@map/MapGl/Markers/markerTransitions'
import MarkerBackgroundIcon from '@map/icons/map/MarkerBackgroundIcon'

const colorOrFallback = (value, fallback = '#757575') => value || fallback

const makeDropShadow = (r, g, b, opacity = 1) => (
    `drop-shadow(0 0 1px rgba(${r}, ${g}, ${b}, ${opacity}))`
)

const useStyles = makeStyles(({ palette }) => ({
    root: ({ color }) => ({
        color: colorOrFallback(color.main)
    }),
    background: ({ color }) => ({
        color: colorOrFallback(color.main),
        filter: makeDropShadow(255, 255, 255),
        transition: [
            'color 200ms cubic-bezier(0.4, 0, 0.2, 1)',
            'fill 200ms cubic-bezier(0.4, 0, 0.2, 1)'
        ],
        '$root:hover &, $root:focus &': {
            color: colorOrFallback(color.light, palette.action.hover)
        },
        '$root:focus &, $root:active &': {
            filter: makeDropShadow(
                ...rgbCssToRgbValues(
                    colorOrFallback(color.light, palette.action.focus)
                )
            )
        },
        '$root:active &': {
            color: colorOrFallback(color.dark, palette.action.active)
        }
    }),
    component: {
        transformOrigin: 'bottom center',
        transform: 'scale(1) translateY(0)'
    },
    currentContext: ({ color }) => ({
        color: colorOrFallback(color.dark, palette.action.active),
        filter: 'none',
        '$root:hover &, $root:focus &, $root:active &': {
            color: colorOrFallback(color.dark, palette.action.active),
            filter: 'none'
        }
    }),
    icon: ({ color }) => ({
        color: colorOrFallback(
            color.contrastText,
            palette.common.black
        )
    })
}), { name: 'FeatureMarker' })

const FeatureMarkerComponent = forwardRef(({
    color,
    contextInfo,
    thisContext,
    iconComponent: IconComponent
}, ref) => {
    const transitionHandleRef = useRef()

    const classes = useStyles({ color })
    const dispatch = useDispatch()

    const handleClick = useCallback(
        () => {
            if (thisContext !== null) {
                dispatch(CONTEXT.set(thisContext))
            }
        },
        [thisContext, dispatch]
    )

    const isCurrentContext = (
        contextInfo.id === thisContext.id &&
        contextInfo.type === thisContext.type
    )

    // We don't run the full transition on mount
    // (could be set via the `appear` prop),
    // hence the manual call to the final callback.
    useEffect(() => {
        if (!transitionHandleRef.current) {
            return
        }

        if (isCurrentContext) {
            transitionContextMarker.onEntered(transitionHandleRef.current)
            return
        }

        transitionContextMarker.onExited(transitionHandleRef.current)
    }, [isCurrentContext, transitionHandleRef])

    return (
        <D3Transition
            {...transitionContextMarker}
            classes={{ component: classes.component }}
            in={isCurrentContext}
            ref={transitionHandleRef}
        >
            <ButtonBase
                centerRipple
                className={classes.root}
                disabled={isCurrentContext}
                onClick={handleClick}
                ref={ref}
            >
                <Box
                    fontSize='2rem'
                    position='relative'
                    display='flex'
                    flexShrink={1}
                >
                    <MarkerBackgroundIcon
                        className={clsx(
                            classes.background,
                            { [classes.currentContext]: isCurrentContext }
                        )}
                        fontSize='inherit'
                    />
                    <Box
                        position='absolute'
                        fontSize='50%'
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
        </D3Transition>
    )
})

FeatureMarkerComponent.propTypes = {
    color: PropTypeColor,
    contextInfo: PropTypeContextInfo.isRequired,
    iconComponent: PropTypes.elementType.isRequired,
    thisContext: PropTypeContext
}

FeatureMarkerComponent.defaultProps = {
    color: null,
    thisContext: null
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
