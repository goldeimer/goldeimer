import clsx from 'clsx'
import PropTypes from 'prop-types'
import React, { forwardRef, useRef } from 'react'
import { Transition } from 'react-transition-group'

import { useForkRef } from '@material-ui/core/utils'
import { makeStyles } from '@material-ui/core/styles'

import { generateShortId } from '@goldeimer/js-util'

import executeTransition from './executeTransition'

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

const D3Transition = ({
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
    TransitionComponent,
    ...transitionProps
}, ref) => {
    const idRef = useRef(generateShortId())
    const nodeRef = useRef(null)
    const handleRef = useForkRef(ref, nodeRef)

    const classes = useStyles()

    const addEndListener = (done) => {
        nodeRef.current.addEventListener(
            `d3:transition-end:${idRef.current}`,
            done,
            false
        )
    }

    const onTransitionEnd = () => {
        const event = new Event(
            `d3:transition-end:${idRef.current}`
        )
        nodeRef.current.dispatchEvent(event)
    }

    const handleEnter = (isAppearing) => {
        if (onEnter) {
            onEnter(nodeRef.current, isAppearing)
        }
    }

    const handleEntering = (isAppearing) => {
        if (onEntering) {
            executeTransition(
                onEntering(nodeRef.current, isAppearing),
                onTransitionEnd
            )
        } else {
            onTransitionEnd()
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
        if (onExiting) {
            executeTransition(
                onExiting(nodeRef.current),
                onTransitionEnd
            )
        } else {
            onTransitionEnd()
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
            addEndListener={addEndListener}
            in={inProp}
            onEnter={handleEnter}
            onEntering={handleEntering}
            onEntered={handleEntered}
            onExit={handleExit}
            onExiting={handleExiting}
            onExited={handleExited}
            nodeRef={nodeRef}
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
                    <div className={clsx(classes.wrapper, classesProp.wrapper)}>
                        {children}
                    </div>
                </Component>
            )}
        </TransitionComponent>
    )
}

D3Transition.propTypes = {
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
    TransitionComponent: PropTypes.elementType
}

D3Transition.defaultProps = {
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
    TransitionComponent: Transition
}

export default forwardRef(D3Transition)
