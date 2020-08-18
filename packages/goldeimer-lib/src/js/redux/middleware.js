import thunk from 'redux-thunk'

import { IS_PRODUCTION_BUILD } from '@lib/util/env'

const middleware = [thunk]

if (!IS_PRODUCTION_BUILD) {
    middleware.push(require('redux-immutable-state-invariant').default())
    middleware.push(require('redux-logger').createLogger())
}

export default middleware
