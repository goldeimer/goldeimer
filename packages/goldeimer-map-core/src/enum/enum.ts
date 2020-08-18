const path = require('path')

enum DataType {
    name = 'DataType',
    UNSPECIFIED = 0,
    OTHER
}

const abspath = (configUriFragment) => path.resolve(
    __dirname,
    `@etc/eslint/eslintrc.${configUriFragment}.js`
)

const EnumMap = new Map(
    Object.keys(DataType).map((key) => ([
        key,
        `$mapped{DataType[key]}`
    ]))
)

console.log(DataType)
console.log(EnumMap)
