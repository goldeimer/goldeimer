import { IS_PRODUCTION_BUILD } from '@lib/util/env'

const WITH_LOGGING = !IS_PRODUCTION_BUILD

/* eslint-disable no-console */
const dir = (instance) => {
    if (WITH_LOGGING) {
        console.dir(instance)
    }
}

const error = (message) => {
    if (WITH_LOGGING) {
        console.error(message)
    }
}

const log = (message) => {
    if (WITH_LOGGING) {
        console.log(message)
    }
}

const warn = (message) => {
    if (WITH_LOGGING) {
        console.warn(message)
    }
}
/* eslint-enable no-console */

export {
    log as default,
    dir,
    error,
    warn
}
