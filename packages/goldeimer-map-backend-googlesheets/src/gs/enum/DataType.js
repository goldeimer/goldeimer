import { makeEnum } from '@lib/enum'

import { toUpper } from '@lib/util'

const {
    enum: DATA_TYPE,
    keyToCapitalizationFunction,
    valueToName
} = makeEnum([
    ['bool', 'boolean'],
    'color',
    'email',
    'enum',
    ['tinyint', '8bit integer'],
    ['foreignKey', 'foreign key'],
    ['foreignKeyId', 'foreign key'],
    'icon',
    'int',
    'latitude',
    'longitude',
    'number',
    ['phone', 'phone number'],
    'text',
    ['url', null, null, toUpper],
    ['uuid', null, null, toUpper]
], 'DataType')

export {
    DATA_TYPE as default,
    keyToCapitalizationFunction,
    valueToName
}
