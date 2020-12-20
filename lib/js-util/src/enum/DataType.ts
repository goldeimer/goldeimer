const path = require('path')

enum DataType {
    name = 'DataType',
    UNSPECIFIED = 0,
    OTHER
}

const abspath = (uriFragment) => path.resolve(
    __dirname,
    `@etc/eslint/eslintrc.${uriFragment}.js`
)

const EnumMap = new Map(
    Object.keys(DataType).map((key) => ([
        key,
        `$mapped{DataType[key]}`
    ]))
)

console.log(DataType)
console.log(EnumMap)
