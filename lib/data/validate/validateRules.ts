import {
    ValidationRule
} from '../data-util/src/enum'

const isPostCode = (value: string) => (
    value.length <= 7
    && value.match(/[-0-9A-Z\s]{4,7}/)
)

const getValidationFunction = (
    validationRule: ValidationRule
): Function => {
    switch (validationRule) {
    case ValidationRule.Max:
        return (value: string, arg: string): boolean => value <= arg

    case ValidationRule.Min:
        return (value: string, arg: string): boolean => value >= arg

    case ValidationRule.MaxLength:
        return (value: string, arg: string): boolean => {
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

export const validateRule = (
    value,
    validationRuleKey,
    validationArg
) => getValidationFunction(
    validationRuleKey
)(value, validationArg)

export const validateRules = (
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
