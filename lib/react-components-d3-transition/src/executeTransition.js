import { select as d3Select } from 'd3-selection'
import 'd3-transition'

import {
    ensureArray,
    generateShortId
} from '@goldeimer/js-util'

import { DEFAULT_DURATION } from './config'

const transitionLocks = {}

const acquireTransitionLock = (key) => {
    if (!transitionLocks[key]) {
        transitionLocks[key] = {}
    }

    return d3Select(transitionLocks[key])
}

const getNodeId = (node) => {
    const currentNodeId = node.getAttribute('id')
    if (currentNodeId) {
        return currentNodeId
    }

    const nodeId = generateShortId()
    node.setAttribute('id', nodeId)

    return nodeId
}

const makeTransition = (node) => {
    const key = `${getNodeId(node)}:${generateShortId()}`

    return acquireTransitionLock(key).transition()
}

// @see [d3.transition.tween](https://github.com/d3/d3-transition/blob/master/README.md#transition_tween)
const executeTransition = (
    {
        delay = 0,
        duration = DEFAULT_DURATION,
        ease = null,
        node,
        tweens = []
    },
    previousTransition = null
) => {
    const d3Transition = previousTransition
        ? previousTransition.transition()
        : makeTransition(node)

    d3Transition
        .delay(delay)
        .duration(duration)

    if (ease) {
        d3Transition.ease(ease)
    }

    tweens.forEach(({ name, value }) => {
        d3Transition.tween(name, value)
    })

    return d3Transition
}

const executeTransitions = (transitions, onTransitionEnd = null) => {
    let previousD3Transition = null

    ensureArray(transitions).forEach((concurrentTransitions, idxConcurrent) => {
        ensureArray(concurrentTransitions).forEach((transition, index) => {
            previousD3Transition = executeTransition(
                transition,
                previousD3Transition
            )

            if (
                onTransitionEnd &&
                idxConcurrent === 0 &&
                index === concurrentTransitions.length - 1
            ) {
                previousD3Transition.on(
                    'end',
                    onTransitionEnd
                )
            }
        })
    })
}

export { executeTransitions as default }
