import { isNumber } from 'typechecker'

const sanitizeNumericValue = (value) => (isNumber(value) ? value : 0)

const sanitizeNumericValues = (values) => values.map(
    (value) => sanitizeNumericValue(value)
)

const sanitizeWithinRange = (value, min, max) => Math.max(
    min,
    Math.min(
        max,
        sanitizeNumericValue(value)
    )
)

export {
    sanitizeNumericValue,
    sanitizeNumericValues,
    sanitizeWithinRange
}
