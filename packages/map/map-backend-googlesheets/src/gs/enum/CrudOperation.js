import { makeEnum } from '@goldeimer/js-util'

import defaultTheme from '@config/theme'

const { palette } = defaultTheme

const {
    enum: CrudOperation,
    keyToName,
    valueToName
} = makeEnum([
    ['create', 'Add new @RECORD_NAME@', palette.info.main],
    'read',
    ['update', 'Edit @RECORD_NAME@', palette.warning.main],
    ['delete', 'Delete @RECORD_NAME@', palette.error.main]
], 'CrudOperation')

export {
    CrudOperation as default,
    keyToName,
    valueToName
}
