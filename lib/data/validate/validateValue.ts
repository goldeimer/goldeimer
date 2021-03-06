import {
    ColumnType,
    DataType,
    ValidationRule
} from '../data-util/src/enum'

import { isDataType } from './isDataType'
import { validateRules } from './validateRules'

export interface ValueArgs <V>{
    columnType: ColumnType
    dataType: DataType
    validations: ValidationRule[]
    value: V
}

export const validateValue = (args: ValueArgs) => {
    const errors = validateRules(value, validations)

    if (!isDataType(value, dataType)) {
        errors.push(ValidationRule.IsDataType)
    }

    if (
        columnType === ColumnType.Required && (
            value === '' ||
            value === null
        )
    ) {
        errors.push(ValidationRule.IsRequired)
    }

    return errors
}
