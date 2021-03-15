import { newDataValidation } from '@gs/server/gsApp'

import assignCustomValidations
    from '@gs/validation/sheet/assignCustomValidations'

import assignDataTypeValidation
    from '@gs/validation/sheet/assignDataTypeValidation'

const applySheetValidation = (
    range,
    columType,
    dataType,
    validations,
    dataTypeArg = null
) => {
    const dataValidation = newDataValidation()
    const a1Notation = range.getA1Notation()

    if (ColumnType.required.is(columnType)) {
        dataValidation.requireFormulaSatisfied(
            `NOT(ISBLANK(${a1Notation}))`
        )
    }

    assignCustomValidations(
        dataValidation,
        validations,
        a1Notation
    )

    assignDataTypeValidation(
        dataValidation,
        dataType,
        dataTypeArg,
        a1Notation
    )

    range.clearDataValidations()
    range.setDataValidation(
        dataValidation
            .setAllowInvalid(false)
            .setHelpText(
                validations.map(([
                    validation,
                    validationArg
                ]) => (
                    validationArg !== null &&
                    validationArg !== undefined
                        ? `${validation}: ${validationArg}`
                        : validation
                )).join('\n')
            ).build()
    )
}

export default applySheetValidation
