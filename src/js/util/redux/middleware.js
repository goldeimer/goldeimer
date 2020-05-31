import thunk from 'redux-thunk'

import { IS_PRODUCTION_BUILD } from 'util/env'

const middleware = [thunk]

if (!IS_PRODUCTION_BUILD) {
    middleware.push(require('redux-logger').createLogger())
}

export default middleware
