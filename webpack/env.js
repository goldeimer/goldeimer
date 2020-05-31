const IS_DEVELOPMENT_BUILD = process.env.NODE_ENV === 'development'
const IS_PRODUCTION_BUILD = !IS_DEVELOPMENT_BUILD
const IS_VERBOSE = process.env.VERBOSE === 'verbose'

module.exports = {
    IS_DEVELOPMENT_BUILD,
    IS_PRODUCTION_BUILD,
    IS_VERBOSE
}
