const isDevBuild = () => process.env.BUILD_CONFIG === 'development'

module.exports = isDevBuild
