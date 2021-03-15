import { makeEnum } from '@goldeimer/js-util'

const {
    enum: ValidationRule,
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
    ValidationRule as default,
    valueToName
}
