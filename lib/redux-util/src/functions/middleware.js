import thunk from 'redux-thunk'

import { isProductionBuild } from '@goldeimer/js-util'

const middleware = [thunk]

if (!isProductionBuild()) {
    middleware.push(require('redux-immutable-state-invariant').default())
    middleware.push(require('redux-logger').createLogger())
}

export default middleware
