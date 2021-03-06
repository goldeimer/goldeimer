import { makeEnum } from '@goldeimer/js-util'

const {
    enum: TableType,
    valueToName
} = makeEnum([
    'default',
    'configMulti',
    'configSingle',
    'log',
    'queue',
    'relation'
], 'TableType')

export {
    TableType as default,
    valueToName
}
