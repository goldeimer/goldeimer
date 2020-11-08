import { makeEnum } from '@lib/enum'

const {
    enum: COLUMN_TYPE,
    valueToName
} = makeEnum([
    ['auto', 'auto filled'],
    'optional',
    'required'
], 'ColumnType')

export {
    COLUMN_TYPE as default,
    valueToName
}
