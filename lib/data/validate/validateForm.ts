import { validateValue } from './validateValue'

export const validateForm = (
    argsList: = []
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
