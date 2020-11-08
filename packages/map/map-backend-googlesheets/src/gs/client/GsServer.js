import { googleScriptRun } from '@gs/client/gsGlobals'

const reservedMethodNames = new Set([
    'withFailureHandler',
    'withLogger',
    'withSuccessHandler',
    'withUserObject'
])

const GsServer = Object.keys(googleScriptRun).reduce((acc, methodName) => {
    if (reservedMethodNames.has(methodName)) {
        return acc
    }

    return {
        ...acc,
        [methodName]: (...args) => new Promise((resolve, reject) => {
            googleScriptRun
                .withSuccessHandler(resolve)
                .withFailureHandler(reject)[methodName](...args)
        })
    }
}, {})

export default GsServer
