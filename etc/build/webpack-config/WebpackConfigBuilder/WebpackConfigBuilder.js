const path = require('path')
const { merge } = require('webpack-merge')

const BuildTarget = require('../enum/BuildTarget')
const RunMode = require('../enum/RunMode')
const SourceType = require('../enum/SourceType')
const WebpackMode = require('../enum/WebpackMode')

const config = require('../config/config')
const makeDefaultEntry = require('../util/defaultEntry')
const plugin = require('../plugin/plugin')
const pkgInfo = require('../util/pkgInfo')

class WebpackConfigBuilder {
    constructor(context, {
        buildTarget = BuildTarget.STABLE,
        isLibrary = false,
        nodeExternalsEnabled = false,
        pluginOptions = {},
        publicPath = '/',
        runMode = RunMode.STANDARD,
        statsEnabled = true,
        treatPeerDepsAsExternals = true,
        webpackConfig = {}
    } = {}) {
        this._context = path.resolve(context)

        if (!this._context) {
            throw new Error(
                'You must provide a build context, an absolute path to the '
                + 'build-relevant root directory.'
            )
        }

        this._pkgInfo = pkgInfo(this._context)

        this._buildTarget = buildTarget
        this._isLibrary = isLibrary
        this._nodeExternalsEnabled = nodeExternalsEnabled
        this._pluginOptions = pluginOptions
        this._publicPath = publicPath
        this._runMode = runMode
        this._statsEnabled = statsEnabled
        this._treatPeerDepsAsExternals = treatPeerDepsAsExternals
        this._webpackConfig = webpackConfig

        this._entries = []
        this._externals = []
        this._externalsWhitelist = []
        this._sourceTypeLoaders = {}
        this._userPlugins = []
    }

    constant(key, value) {
        this._pluginOptions.define[key] = value
    }

    copy(...patterns) {
        this._userPlugins.push(plugin.copy(...patterns))
    }

    defaultEntry() {
        this.entry(
            makeDefaultEntry({
                context: this._context,
                pkgInfo: this._pkgInfo
            })
        )
    }

    entry(key, entry = null) {
        this._entries.push([
            key,
            entry || `./src/${key}.js`
        ])
    }

    external(dep) {
        this._externals.push(dep)
    }

    externalWhitelist(dep) {
        this._externalsWhitelist.push(dep)
    }

    html(options = {}) {
        this._userPlugins.push(plugin.html(options))
    }

    isLibrary(is = true) {
        this._isLibrary = Boolean(is)
    }

    loadSource(sourceType) {
        this._sourceTypeLoaders[sourceType] = SourceType.getLoaderConfig({
            context: this._context,
            mode: this._mode,
            sourceType
        })
    }

    mergeWebpackConfig(config) {
        this._webpackConfig = merge(this._webpackConfig, config)
    }

    nodeExternalsEnabled(enabled = true) {
        this._nodeExternalsEnabled = Boolean(enabled)
    }

    publicPath(_path = '/') {
        this._publicPath = _path
    }

    runMode(runMode) {
        this._runMode = runMode
    }

    stats(enabled = true) {
        this._statsEnabled = Boolean(enabled)
    }

    treatPeerDepsAsExternals(enabled = true) {
        this._treatPeerDepsAsExternals = Boolean(enabled)
    }

    webpackConfig(config) {
        this._webpackConfig = config
    }

    build(env = {}, argv = {}) {
        this._mode = argv.mode || (env.WEBPACK_MODE || this._mode)
        this._buildTarget = env.BUILD_TARGET || this._buildTarget

        // this.constant(
        //     'PACKAGE_VERSION',
        //     this._pkg.version
        // )

        process.env.BABEL_ENV = `${this._isLibrary ? 'library-' : ''}${this._buildTarget}-${this._mode}`

        const pkgConfig = merge(
            config.baseConfig({
                buildTarget: this._buildTarget,
                context: this._context,
                entries: this._entries,
                externals: this._externals,
                externalsWhitelist: this._externalsWhitelist,
                isLibrary: this._isLibrary,
                mode: this._mode,
                nodeExternalsEnabled: this._nodeExternalsEnabled,
                pkgInfo: this._pkgInfo,
                publicPath: this._publicPath,
                treatPeerDepsAsExternals: this._treatPeerDepsAsExternals
            }),
            plugin.initPlugins({
                mode: this._mode,
                pluginOptions: this._pluginOptions,
                userPlugins: this._userPlugins,
                statsEnabled: this._statsEnabled
            }),
            ...Object.values(this._sourceTypeLoaders),
            RunMode.getConfig(this._runMode),
            this._webpackConfig
        )

        if (env.BUILD_VERBOSE) {
            console.info(pkgConfig)
        }

        return pkgConfig
    }
}

module.exports = WebpackConfigBuilder
