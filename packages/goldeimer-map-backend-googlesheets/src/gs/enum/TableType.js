import { makeEnum } from '@lib/enum'

const {
    enum: TABLE_TYPE,
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
    TABLE_TYPE as default,
    valueToName
}
