import isProduction from 'util/isProduction'

const log = (message) => {
    if (!isProduction()) {
        /* eslint-disable-next-line no-console */
        console.log(message)
    }
}

export default log
