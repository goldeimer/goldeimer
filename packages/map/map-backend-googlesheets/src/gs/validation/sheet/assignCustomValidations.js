const assignCustomValidation = (
    dataValidation,
    validation,
    validationArg,
    a1Notation
) => {
    switch (validation) {
        case 'max':
            return dataValidation.requireNumberLessThanOrEqualTo(
                validationArg
            )

        case 'maxLength':
            return dataValidation.requireFormulaSatisfied(
                `=LTE(LEN(CLEAN(${a1Notation})), ${validationArg})`
            )

        case 'min':
            return dataValidation.requireNumberGreaterThanOrEqualTo(
                validationArg
            )

        case 'minLength':
            return dataValidation.requireFormulaSatisfied(
                `=GTE(LEN(CLEAN(${a1Notation})), ${validationArg})`
            )

        case 'isPostCode':
            return dataValidation.requireFormulaSatisfied(
                `=REGEXMATCH(${a1Notation}, "[-0-9A-Z\\s]{4,7}")`
            )

        default:
            return dataValidation
    }
}

const assignCustomValidations = (
    dataValidation,
    validations,
    a1Notation
) => validations.forEach(([
    validation,
    validationArg
]) => assignCustomValidation(
    dataValidation,
    validation,
    validationArg,
    a1Notation
))

export default assignCustomValidations
