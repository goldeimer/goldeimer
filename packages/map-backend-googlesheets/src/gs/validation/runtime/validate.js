import {
    ColumnType,
    ValidationRule
} from '../enum'

import isDataType from '@gs/validation/runtime/isDataType'
import runCustomValidations from '@gs/validation/runtime/runCustomValidations'

const validateValue = ({
    columnType,
    dataType,
    validations,
    value
}) => {
    const errors = runCustomValidations(value, validations)

    if (!isDataType(value, dataType)) {
        errors.push(ValidationRule.isDataType)
    }

    if (
        ColumnType.Required.is(columnType) && (
            value === '' ||
            value === null
        )
    ) {
        errors.push(ValidationRule.isRequired)
    }

    return errors
}

const validateForm = (
    argsList = []
) => argsList.reduce((acc, {
    fieldId,
    ...args
}) => {
    const errors = validateValue(args)

    return {
        ...acc,
        [fieldId]: errors,
        isValid: !acc.isValid
            ? false
            : errors.length === 0
    }
}, { isValid: true })

export {
    validateForm,
    validateValue
}
