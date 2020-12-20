
import React, { forwardRef, useRef } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { Transition } from 'react-transition-group'

import { useForkRef } from '@material-ui/core/utils'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { reflow } from '@goldeimer/js-util'

import PropTypeComponent from './PropTypeComponent'
import PropTypeParentClusterOrigin from './PropTypeParentClusterOrigin'

const makeStateDependentHtmlClassAttribute = (
    className,
    transitionState
) => (
    className && transitionState ? `${className}-${transitionState}` : null
)

const useStyles = makeStyles(() => ({
    component: {

    },
    wrapper: {}
}))

const setTranslateValue = (node, x, y) => {
    const transform = `translate3d(${x}px, ${y}px, 0)`

    node.style.webkitTransform = transform
    node.style.transform = transform
}

const FeatureMarkerTransition = ({
    appear,
    children,
    classes: classesProp,
    component: Component,
    in: inProp,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    parentClusterOrigin,
    TransitionComponent,
    unmountOnExit,
    ...transitionProps
}, ref) => {
    const nodeRef = useRef(null)
    const handleRef = useForkRef(ref, nodeRef)

    const classes = useStyles()
    const { transitions } = useTheme()

    const addEndListener = (done) => {
        nodeRef.current.addEventListener(
            // browser native css event
            'transitionend',
            done,
            false
        )
    }

    const handleEnter = (isAppearing) => {
        if (isAppearing && parentClusterOrigin) {
            const rect = nodeRef.current.getBoundingClientRect()

            nodeRef.current.style.opacity = 0

            setTranslateValue(
                nodeRef.current,
                parentClusterOrigin.x - (rect.x + (rect.width / 2)),
                parentClusterOrigin.y - (rect.y + (rect.height / 2))
            )

            reflow(nodeRef.current)
        }

        if (onEnter) {
            onEnter(nodeRef.current, isAppearing)
        }
    }

    const handleEntering = (isAppearing) => {
        if (isAppearing && parentClusterOrigin) {
            const transition = {
                duration: transitions.duration.enteringScreen,
                easing: transitions.easing.easeOut
            }

            const opacityTransition = transitions.create(
                'opacity',
                transition
            )

            nodeRef.current.style.webkitTransition = `${transitions.create(
                '-webkit-transform',
                transition
            )}, ${opacityTransition}`

            nodeRef.current.style.transition = `${transitions.create(
                'transform',
                transition
            )}, ${opacityTransition}`

            nodeRef.current.style.opacity = 1
            nodeRef.current.style.webkitTransform = 'none'
            nodeRef.current.style.transform = 'none'
        }

        if (onEntering) {
            onEntering(nodeRef.current, isAppearing)
        }
    }

    const handleEntered = (isAppearing) => {
        if (onEntered) {
            onEntered(nodeRef.current, isAppearing)
        }
    }

    const handleExit = () => {
        if (onExit) {
            onExit(nodeRef.current)
        }
    }

    const handleExiting = () => {
        const transition = {
            duration: transitions.duration.leavingScreen,
            easing: transitions.easing.sharp
        }

        const opacityTransition = transitions.create(
            'opacity',
            transition
        )

        nodeRef.current.style.webkitTransition = `${transitions.create(
            '-webkit-transform',
            transition
        )}, ${opacityTransition}`

        nodeRef.current.style.transition = `${transitions.create(
            'transform',
            transition
        )}, ${opacityTransition}`

        nodeRef.current.style.opacity = 0

        if (onExiting) {
            onExiting(nodeRef.current)
        }
    }

    const handleExited = () => {
        if (onExited) {
            onExited(nodeRef.current)
        }
    }

    return (
        <TransitionComponent
            {...transitionProps}
            appear={appear}
            addEndListener={addEndListener}
            in={inProp}
            onEnter={handleEnter}
            onEntering={handleEntering}
            onEntered={handleEntered}
            onExit={handleExit}
            onExiting={handleExiting}
            onExited={handleExited}
            nodeRef={nodeRef}
            unmountOnExit={unmountOnExit}
        >
            {(transitionState) => (
                <Component
                    ref={handleRef}
                    className={clsx(
                        classes.component,
                        makeStateDependentHtmlClassAttribute(
                            classes.component,
                            transitionState
                        ),
                        classesProp.component,
                        makeStateDependentHtmlClassAttribute(
                            classesProp.component,
                            transitionState
                        )
                    )}
                >
                    {children}
                </Component>
            )}
        </TransitionComponent>
    )
}

FeatureMarkerTransition.propTypes = {
    appear: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func
    ]).isRequired,
    classes: PropTypes.exact({
        component: PropTypes.string,
        wrapper: PropTypes.string
    }),
    component: PropTypeComponent,
    in: PropTypes.bool,
    onEnter: PropTypes.func,
    onEntering: PropTypes.func,
    onEntered: PropTypes.func,
    onExit: PropTypes.func,
    onExiting: PropTypes.func,
    onExited: PropTypes.func,
    parentClusterOrigin: PropTypeParentClusterOrigin,
    TransitionComponent: PropTypes.elementType,
    unmountOnExit: PropTypes.bool
}

FeatureMarkerTransition.defaultProps = {
    appear: true,
    classes: {
        component: null,
        wrapper: null
    },
    component: 'div',
    in: false,
    onEnter: null,
    onEntering: null,
    onEntered: null,
    onExit: null,
    onExiting: null,
    onExited: null,
    parentClusterOrigin: null,
    TransitionComponent: Transition,
    unmountOnExit: false
}

export default forwardRef(FeatureMarkerTransition)
