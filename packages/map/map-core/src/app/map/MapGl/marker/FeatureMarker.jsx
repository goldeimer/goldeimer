import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React, {
    forwardRef,
    memo,
    useCallback,
    useRef
} from 'react'
import { useDispatch } from 'react-redux'

import Box from '@material-ui/core/Box'
import ButtonBase from '@material-ui/core/ButtonBase'

import { rgbCssToRgbValues } from '@goldeimer/js-util'
import { D3Transition } from '@goldeimer/react-components'

import CONTEXT, {
    PropTypeContext,
    PropTypeContextInfo
} from '../../context'
import { PropTypeColor } from '../../feature'
import MarkerBackgroundIcon from '../../icon/map/MarkerBackgroundIcon'

import FeatureMarkerDetailCard from './FeatureMarkerDetailCard'
// TODO(Johannes):
// Use or remove.
// import FeatureMarkerTransition from './FeatureMarkerTransition'
import Marker, { ANCHOR_TO } from './Marker'
import PropTypeParentClusterOrigin
    from './PropTypeParentClusterOrigin'
import { transitionContextMarker } from './markerTransitions'

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
    transitionComponent: {
        transformOrigin: 'bottom center',
        transform: 'scale(1) translateY(0)',
        '&-entering': {
            transform: 'scale(1.25) translateY(0)'
        }
    },
    currentContext: ({ color }) => ({
        color: colorOrFallback(color.dark, palette.action.active),
        filter: 'none',
        '$root:hover &, $root:focus &, $root:active &': {
            color: colorOrFallback(color.dark, palette.action.active),
            filter: 'none'
        }
    }),
    currentHighlight: ({ color }) => ({
        color: colorOrFallback(color.light, palette.action.active)
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
    highlightId,
    iconComponent: IconComponent,
    parentClusterOrigin,
    setIsDetailEnabled,
    thisContext
}, ref) => {
    const transitionHandleRef = useRef()

    const classes = useStyles({ color })
    const dispatch = useDispatch()

    const handleClick = useCallback(() => {
        if (thisContext !== null) {
            dispatch(CONTEXT.set(thisContext))

            if (setIsDetailEnabled) {
                setIsDetailEnabled(false)
            }
        }
    }, [
        dispatch,
        setIsDetailEnabled,
        thisContext
    ])

    const isCurrentContext = (
        contextInfo.id === thisContext.id
        && contextInfo.type === thisContext.type
    )

    const isCurrentHighlight = highlightId === thisContext.id

    const handleEnter = (isAppearing) => {
        if (parentClusterOrigin && isAppearing) {
            setIsDetailEnabled(false)
        }
    }

    const handleEntered = (isAppearing) => {
        setIsDetailEnabled(true)
    }

    return (
        // TODO(Johannes): see above
        // <FeatureMarkerTransition
        //     appear
        //     in
        //     onEnter={handleEnter}
        //     parentClusterOrigin={parentClusterOrigin}
        // >
        //     {/* TODO:
        //       * Convert the `transitionContextMarker` props object
        //       * into a component (i.e. a parent of `D3Transition`).
        //       */}
        <D3Transition
            appear
            {...transitionContextMarker}
            classes={{ component: classes.transitionComponent }}
            in={isCurrentContext}
            onEnter={handleEnter}
            onEntered={handleEntered}
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
                    fontSize="2rem"
                    position="relative"
                    display="flex"
                    flexShrink={1}
                >
                    <MarkerBackgroundIcon
                        className={clsx(
                            classes.background,
                            {
                                [classes.currentContext]: isCurrentContext,
                                [classes.currentHighlight]: isCurrentHighlight
                            }
                        )}
                        fontSize="inherit"
                    />
                    <Box
                        position="absolute"
                        fontSize="50%"
                        top={4}
                        left={8}
                        display="flex"
                        flexShrink={1}
                    >
                        <IconComponent
                            className={classes.icon}
                            fontSize="inherit"
                        />
                    </Box>
                </Box>
            </ButtonBase>
        </D3Transition>
        // TODO(Johannes): see above
        // </FeatureMarkerTransition>
    )
})

FeatureMarkerComponent.propTypes = {
    color: PropTypeColor,
    contextInfo: PropTypeContextInfo.isRequired,
    highlightId: PropTypes.string,
    iconComponent: PropTypes.elementType.isRequired,
    parentClusterOrigin: PropTypeParentClusterOrigin,
    setIsDetailEnabled: PropTypes.func,
    thisContext: PropTypeContext
}

FeatureMarkerComponent.defaultProps = {
    color: null,
    highlightId: null,
    parentClusterOrigin: null,
    setIsDetailEnabled: null,
    thisContext: null
}

const FeatureMarker = (props) => (
    <Marker
        {...props}
        anchorTo={ANCHOR_TO.top}
        component={FeatureMarkerComponent}
        defaultDimensions={{ height: 32, width: 32 }}
        detailPopperComponent={FeatureMarkerDetailCard}
    />
)

FeatureMarker.propTypes = Marker.propTypes

FeatureMarker.defaultProps = Marker.defaultProps

export default memo(FeatureMarker)
