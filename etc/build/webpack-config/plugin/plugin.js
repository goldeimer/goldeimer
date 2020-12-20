const WebpackMode = require('../enum/WebpackMode')

const plugin = {
    bundleAnalyzer: require('./webpack.plugin.bundle-analyzer'),
    bundleStats: require('./webpack.plugin.bundle-stats'),
    clean: require('./webpack.plugin.clean'),
    copy: require('./webpack.plugin.copy'),
    define: require('./webpack.plugin.define'),
    html: require('./webpack.plugin.html'),
    imageMinimizer: require('./webpack.plugin.image-minimizer'),
    manifest: require('./webpack.plugin.manifest'),
    progress: require('./webpack.plugin.progress'),
    provide: require('./webpack.plugin.provide'),
    stats: require('./webpack.plugin.stats')
}

const initStatsPlugins = ({
    mode = WebpackMode.PRODUCTION,
    pluginOptions = {}
}) => ([
    plugin.stats({
        mode,
        options: pluginOptions.stats || {}
    }),
    plugin.bundleAnalyzer({
        mode,
        options: pluginOptions.bundleAnalyzer || {}
    })
    // plugin.bundleStats({
    //     mode: mode,
    //     options: pluginOptions.bundleStats || {}
    // })
])

// TODO(Johannes):
// Consider webpack-babel-multi-target-plugin,
// to decrease bundle size for modern environments
// (i.e. those that understand <script type="module">).
const initPlugins = ({
    mode = WebpackMode.PRODUCTION,
    nodeExternals = false,
    pluginOptions = {},
    statsEnabled = true,
    userPlugins = []
}) => ({
    plugins: [
        plugin.progress(),
        plugin.clean(),
        plugin.provide(),
        plugin.define(pluginOptions.define || {}),
        ...userPlugins,
        ...(statsEnabled
            ? initStatsPlugins({
                mode,
                pluginOptions
            })
            : []),
        plugin.imageMinimizer(),
        plugin.manifest()
    ]
})

module.exports = ({
    ...plugin,
    initPlugins,
    initStatsPlugins
})
