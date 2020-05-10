import { ERROR_TYPE } from 'actions/util/errorWrapper'

const INITIAL_STATE = []

// TODO:
// This is a stub, pretty much.
// - [sys] log to somewhere
// - [UX] user friendly messages
const errorReducer = (
    state = INITIAL_STATE,
    action
) => {
    switch (action.type) {
    case ERROR_TYPE.default:
        state.push(action)

        if (process.env.NODE_ENV !== 'production') {
            /* eslint-disable no-console */
            console.log('ERROR')
            console.log(action)
            /* eslint-enable no-console */
        }

        // limit max size of error queue
        if (state.length > 5) {
            state.shift()
        }

        return state

    default:
        return state
    }
}

export default errorReducer
