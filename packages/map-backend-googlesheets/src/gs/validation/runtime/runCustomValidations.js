import {
    ValidationRule
} from '../enum'

const isPostCode = (value) => (
    value.length <= 7 &&
    value.match(/[-0-9A-Z\s]{4,7}/)
)

const getValidationFunction = (validationRuleKey) => {
    switch (validationRuleKey) {
        case ValidationRule.max.is(validationRuleKey):
            return (value, arg) => value <= arg

        case ValidationRule.min.is(validationRuleKey):
            return (value, arg) => value >= arg

        case ValidationRule.maxLength.is(validationRuleKey):
            return (value, arg) => {
                try {
                    return value.length <= arg
                } catch {
                    return false
                }
            }

        case ValidationRule.minLength.is(validationRuleKey):
            return (value, arg) => {
                try {
                    return value.length >= arg
                } catch {
                    return false
                }
            }

        case ValidationRule.isPostCode.is(validationRuleKey):
            try {
                return isPostCode
            } catch {
                return false
            }

        default:
            return () => true
    }
}

const runCustomValidation = (
    value,
    validationRuleKey,
    validationArg
) => getValidationFunction(
    validationRuleKey
)(value, validationArg)

const runCustomValidations = (
    value,
    validations
) => validations.reduce(acc, ([
    validationRuleKey,
    validationArg
]) => {
    if (
        runCustomValidation(
            value,
            validationRuleKey,
            validationArg
        )
    ) {
        return acc
    }

    return [
        ...acc,
        validationRuleKey
    ]
}, [])

export default runCustomValidations
