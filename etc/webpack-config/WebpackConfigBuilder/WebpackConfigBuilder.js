const {
    BuildTarget,
    readPkgInfo
} = require('@goldeimer/build-util')

const path = require('path')
const { merge } = require('webpack-merge')

const RunMode = require('../enum/RunMode')
const SourceType = require('../enum/SourceType')

const config = require('../config/config')
const makeDefaultEntry = require('../util/defaultEntry')
const plugin = require('../plugin/plugin')

class WebpackConfigBuilder {
    constructor(
        context, {
            buildTarget = BuildTarget.CJS,
            isLibrary = false,
            nodeExternalsEnabled = false,
            outputPath = 'dist',
            pluginOptions = {},
            publicPath = '/',
            runMode = RunMode.STANDARD,
            statsEnabled = true,
            treatPeerDepsAsExternals = true,
            webpackConfig = {}
        } = {}
    ) {
        this.context = path.resolve(context)

        if (!this.context) {
            throw new Error(
                'You must provide a build context, an absolute path to the '
                + 'build-relevant root directory.'
            )
        }

        this.pkgInfo = readPkgInfo(this.context)

        this.buildTarget = buildTarget
        this.isLibrary = isLibrary
        this.nodeExternalsEnabled = nodeExternalsEnabled
        this.outputPath = outputPath
        this.pluginOptions = pluginOptions
        this.publicPath = publicPath
        this.runMode = runMode
        this.statsEnabled = statsEnabled
        this.treatPeerDepsAsExternals = treatPeerDepsAsExternals
        this.webpackConfig = webpackConfig

        this.entries = []
        this.externals = []
        this.externalsWhitelist = []
        this.sourceTypeLoaders = {}
        this.userPlugins = []
    }

    constant(key, value) {
        this.pluginOptions.define[key] = value
    }

    copy(...patterns) {
        this.userPlugins.push(plugin.copy(...patterns))
    }

    defaultEntry() {
        this.entry(
            makeDefaultEntry({
                context: this.context,
                pkgInfo: this.pkgInfo
            })
        )
    }

    entry(key, entry = null) {
        this.entries.push([
            key,
            entry || `./src/${key}.js`
        ])
    }

    external(dep) {
        this.externals.push(dep)
    }

    externalWhitelist(dep) {
        this.externalsWhitelist.push(dep)
    }

    html(options = {}) {
        this.userPlugins.push(plugin.html(options))
    }

    loadSource(sourceType) {
        this.sourceTypeLoaders[sourceType] = SourceType.getLoaderConfig({
            context: this.context,
            mode: this.mode,
            sourceType
        })
    }

    mergeWebpackConfig(options) {
        this.webpackConfig = merge(
            this.webpackConfig,
            options
        )
    }

    nodeExternalsEnabled(enabled = true) {
        this.nodeExternalsEnabled = Boolean(enabled)
    }

    setIsLibrary(is = true) {
        this.isLibrary = Boolean(is)
    }

    setOutputPath(_path = 'dist') {
        this.outputPath = _path
    }

    setPublicPath(_path = '/') {
        this.publicPath = _path
    }

    setRunMode(runMode) {
        this.runMode = runMode
    }

    setTreatPeerDepsAsExternals(enabled = true) {
        this.treatPeerDepsAsExternals = Boolean(enabled)
    }

    stats(enabled = true) {
        this.statsEnabled = Boolean(enabled)
    }

    webpackConfig(options) {
        this.webpackConfig = options
    }

    build(env = {}, argv = {}) {
        this.mode = argv.mode || (env.WEBPACK_MODE || this.mode)
        this.buildTarget = env.BUILD_TARGET || this.buildTarget

        // this.constant(
        //     'PACKAGE_VERSION',
        //     this.pkg.version
        // )

        process.env.BABEL_ENV = `${this.isLibrary ? 'library-' : ''}${this.buildTarget}-${this.mode}`

        const pkgConfig = merge(
            config.baseConfig({
                buildTarget: this.buildTarget,
                context: this.context,
                entries: this.entries,
                externals: this.externals,
                externalsWhitelist: this.externalsWhitelist,
                isLibrary: this.isLibrary,
                mode: this.mode,
                nodeExternalsEnabled: this.nodeExternalsEnabled,
                outputPath: this.outputPath,
                pkgInfo: this.pkgInfo,
                publicPath: this.publicPath,
                treatPeerDepsAsExternals: this.treatPeerDepsAsExternals
            }),
            plugin.initPlugins({
                mode: this.mode,
                pluginOptions: this.pluginOptions,
                userPlugins: this.userPlugins,
                statsEnabled: this.statsEnabled
            }),
            ...Object.values(this.sourceTypeLoaders),
            RunMode.getConfig(this.runMode),
            this.webpackConfig
        )

        if (env.BUILD_VERBOSE) {
            console.info(
                JSON.stringify(
                    pkgConfig,
                    null,
                    4
                )
            )
        }

        return pkgConfig
    }
}

module.exports = WebpackConfigBuilder
