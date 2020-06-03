import { easeCubic, easeLinear, easePoly } from 'd3-ease'
import { FlyToInterpolator, LinearInterpolator } from 'react-map-gl'

import generateId from '@lib/util/generateId'
import makeEnum from '@lib/enum/makeEnum'

const EASING_TYPE = makeEnum([
    'cubic',
    'linear',
    'polyOneHalf'
])

const INTERPOLATOR_TYPE = makeEnum([
    'flyTo',
    'linear'
])

const easePolyOneHalf = easePoly.exponent(1.5)

const getEasingFunction = (easingType) => {
    switch (easingType) {
    case EASING_TYPE.cubic:
        return easeCubic

    case EASING_TYPE.polyOneHalf:
        return easePolyOneHalf

    // case EASING_TYPE.linear:  [[fallthrough]]
    default:
        return easeLinear
    }
}

const makeInterpolator = (interpolatorType, ...interpolatorArgs) => {
    switch (interpolatorType) {
    case INTERPOLATOR_TYPE.flyTo:
        return new FlyToInterpolator({
            curve: 1.414,
            speed: 1.2,
            ...interpolatorArgs
        })

    // case INTERPOLATOR_TYPE.linear:  [[fallthrough]]
    default:
        return new LinearInterpolator()
    }
}

const makeSerializableTransition = (
    duration,
    easingType,
    interpolatorType
) => ({
    duration,
    easingType: easingType.value,
    interpolatorType: interpolatorType.value
})

const makeDefaultTransition = () => makeSerializableTransition(
    500,
    EASING_TYPE.polyOneHalf,
    INTERPOLATOR_TYPE.linear
)

const makeTransitionCaseReducer = (serializableTransition) => () => ({
    prepare: () => ({ payload: { id: generateId() } }),
    reducer: (_, { payload: { id } }) => ({ id, ...serializableTransition })
})

const caseReducers = {
    flyTo: makeTransitionCaseReducer(
        makeSerializableTransition(
            'auto',
            EASING_TYPE.cubic,
            INTERPOLATOR_TYPE.flyTo
        )
    ),
    instant: makeTransitionCaseReducer(
        makeSerializableTransition(
            'auto',
            EASING_TYPE.cubic,
            INTERPOLATOR_TYPE.flyTo
        )
    ),
    default: makeTransitionCaseReducer(
        makeDefaultTransition()
    )
}

const INITIAL_TRANSITION = {
    id: null,
    ...makeDefaultTransition()
}

const instantiateTransition = ({
    duration: transitionDuration = INITIAL_TRANSITION.duration,
    easingType,
    interpolatorType
}) => ({
    transitionDuration,
    transitionEasing: getEasingFunction(easingType),
    transitionInterpolator: makeInterpolator(interpolatorType)
})

export {
    instantiateTransition,
    caseReducers as transitionReducers,
    INITIAL_TRANSITION
}
