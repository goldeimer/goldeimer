import {
    ColumnType,
    ValidationRule
} from '../../enum'

import isDataType from './isDataType'
import runCustomValidations from './runCustomValidations'

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
        ColumnType.required.is(columnType) && (
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
