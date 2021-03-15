import { makeEnum } from '@goldeimer/js-util'

const {
    enum: ColumnType,
    valueToName
} = makeEnum([
    ['auto', 'auto filled'],
    'optional',
    'required'
], 'ColumnType')

export {
    ColumnType as default,
    valueToName
}
