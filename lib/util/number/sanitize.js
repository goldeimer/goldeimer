const sanitizeNumericValue = (value) => (Number.isNaN(value) ? 0 : value)

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
