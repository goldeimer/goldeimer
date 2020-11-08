import { makeEnum } from '@lib/enum'

import defaultTheme from '@config/theme'

const { palette } = defaultTheme

const {
    enum: CRUD_OPERATION,
    keyToName,
    valueToName
} = makeEnum([
    ['create', 'Add new @RECORD_NAME@', palette.info.main],
    'read',
    ['update', 'Edit @RECORD_NAME@', palette.warning.main],
    ['delete', 'Delete @RECORD_NAME@', palette.error.main]
], 'CrudOperation')

export {
    CRUD_OPERATION as default,
    keyToName,
    valueToName
}
