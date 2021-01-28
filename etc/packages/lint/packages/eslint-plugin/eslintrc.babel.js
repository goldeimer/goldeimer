module.exports = {
    parser: '@babel/eslint-parser',
    parserOptions: {
        presets: ['@goldeimer/babel-preset'],
        requireConfigFile: false
    },
    plugins: ['@babel'],
    rules: {
        "@babel/new-cap": "error",
        "@babel/no-invalid-this": "error",
        "@babel/no-unused-expressions": "error",
        "@babel/object-curly-spacing": "error",
        "@babel/semi": "error"
    }
}
