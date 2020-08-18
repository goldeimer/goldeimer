import {
    easePolyIn,
    easePolyOut,
    easePolyInOut,
    easeElasticOut
} from 'd3-ease'
import { interpolateString } from 'd3-interpolate'

import { reflow } from '@lib/util'

const transitionContextMarker = {
    onEnter: (node, isAppearing = false) => {
        node.style.transform = isAppearing
            ? 'scale(1.25) translateY(0px)'
            : 'scale(1) translateY(0px)'

        reflow(node)
    },
    onEntering: (node, isAppearing = false) => (isAppearing
        ? []
        : [
            [
                {
                    node,
                    delay: 0,
                    duration: 200,
                    ease: easePolyIn,
                    tweens: [{
                        name: 'style:transform',
                        value: () => {
                            const i = interpolateString(
                                'scale(1) translateY(0px)',
                                'scale(0) translateY(0px)'
                            )

                            return (t) => { node.style.transform = i(t) }
                        }
                    }]
                },
                {
                    node,
                    delay: 0,
                    duration: 300,
                    ease: easePolyOut,
                    tweens: [{
                        name: 'style:transform',
                        value: () => {
                            const i = interpolateString(
                                'scale(0) translateY(0px)',
                                'scale(1.25) translateY(-12px)'
                            )

                            return (t) => { node.style.transform = i(t) }
                        }
                    }]
                },
                {
                    node,
                    delay: 0,
                    duration: 2000,
                    ease: easeElasticOut,
                    tweens: [{
                        name: 'style:transform',
                        value: () => {
                            const i = interpolateString(
                                'scale(1.25) translateY(-12px)',
                                'scale(1.25) translateY(0px)'
                            )

                            return (t) => { node.style.transform = i(t) }
                        }
                    }]
                }
            ]
        ]
    ),
    onEntered: (node) => {
        node.style.transform = 'scale(1.25) translateY(0px)'
    },
    onExit: (node) => {
        node.style.transform = 'scale(1.25) translateY(0px)'
        reflow(node)
    },
    onExiting: (node) => ({
        node,
        delay: 0,
        duration: 500,
        ease: easePolyInOut,
        tweens: [{
            name: 'style:transform',
            value: () => {
                const i = interpolateString(
                    'scale(1.25) translateY(0px)',
                    'scale(1) translateY(0px)'
                )

                return (t) => { node.style.transform = i(t) }
            }
        }]
    }),
    onExited: (node) => {
        node.style.transform = 'scale(1) translateY(0px)'
    }
}

export {
    /* eslint-disable-next-line import/prefer-default-export */
    transitionContextMarker
}
