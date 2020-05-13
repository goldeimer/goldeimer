import { ERROR_TYPE } from 'actions/util/errorWrapper'
import log from 'util/log'

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

        log('ERROR')
        log(action)

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
