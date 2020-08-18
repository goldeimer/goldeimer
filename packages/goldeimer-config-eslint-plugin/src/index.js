module.exports = {
    deprecatedRules: [],
    rules: [],
    configs: {
        core: require('./eslintrc.core'),
        babel: require('./eslintrc.babel'),
        googleappsscript: require('./eslintrc.googleappsscript'),
        react: require('./eslintrc.react'),
        typescript: require('./eslintrc.typescript'),
        webpack: require('./eslintrc.webpack')
    }
}
