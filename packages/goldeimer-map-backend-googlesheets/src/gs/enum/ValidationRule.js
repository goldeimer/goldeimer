import { makeEnum } from '@lib/enum'

const {
    enum: VALIDATION_RULE,
    valueToName
} = makeEnum([
    ['isDataType', 'valid value for the data type'],
    ['isPostCode', 'valid post code'],
    ['isRequired', 'valid value for a required field'],
    ['max', 'max. value'],
    ['min', 'min. value'],
    ['maxLength', 'max. length'],
    ['minLength', 'min. length']
], 'ValidationRule')

export {
    VALIDATION_RULE as default,
    valueToName
}
