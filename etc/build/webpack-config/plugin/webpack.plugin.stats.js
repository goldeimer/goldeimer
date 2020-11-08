const StatsPlugin = require('stats-webpack-plugin')

const { VENDOR_REACT } = require('../enum/WebpackRuleTest')

const statsConfig = ({
    ...options
} = {}) => ({
    assets: true,
    assetsSort: '!size',
    builtAt: true,
    cachedAssets: true,
    children: true,
    chunks: true,
    chunkGroups: true,
    chunkModules: true,
    chunkRelations: true,
    chunkRootModules: true,
    chunksSort: '!size',
    depth: true,
    entrypoints: true,
    env: true,
    errorDetails: true,
    errorStack: true,
    excludeAssets: [],
    excludeModules: [],
    hash: true,
    // @ type boolean|string
    //        'info': 'none' | 'error' | 'warn' | 'info'  | 'log' | 'verbose'
    maxModules: 20,
    logging: 'log',
    modules: true,
    modulesSort: '!size',
    moduleTrace: true,
    orphanModules: true,
    outputPath: true,
    performance: true,
    providedExports: true,
    publicPath: true,
    reasons: true,
    relatedAssets: true,
    timings: true,
    usedExports: true,
    version: true,
    warningsFilter: [],
    ...options
})

module.exports = ({
    mode = 'unknown',
    options = {}
} = {}) => new StatsPlugin(
    `artifacts/stats.${mode}.json`,
    statsConfig({
        excludeModules: [VENDOR_REACT],
        ...options
    })
)
