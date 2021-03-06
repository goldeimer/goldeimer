import { makeEnum } from '@goldeimer/js-util'

import { toUpper } from '@goldeimer/js-util'

const {
    enum: DataType,
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
    DataType as default,
    keyToCapitalizationFunction,
    valueToName
}
