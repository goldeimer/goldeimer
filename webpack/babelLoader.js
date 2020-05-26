const { isJavaScriptFile } = require('./condition')

const babelLoader = {
    test: isJavaScriptFile,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        bugfixes: true,
                        corejs: 3,
                        loose: true,
                        modules: false,
                        targets: '> 0.25%, not dead',
                        useBuiltIns: 'usage',
                    }
                ],
                '@babel/preset-react',
            ],
            plugins: [
                '@babel/plugin-transform-runtime',
            ],
            cacheDirectory: true,
        },
    },
}

module.exports = babelLoader
