const makeCondition = (
    compare
) => (
    columnId,
    search
) => (
    record,
    columnIds
) => compare(
    record[columnIds.indexOf(columnId)],
    search
)

const eq = makeCondition((a, b) => a === b)

const neq = makeCondition((a, b) => a !== b)

const gt = makeCondition((a, b) => a > b)

const gte = makeCondition((a, b) => a >= b)

const lt = makeCondition((a, b) => a < b)

const lte = makeCondition((a, b) => a <= b)

const and = (
    ...conditions
) => (
    record,
    columnIds
) => conditions.all((condition) => condition(
    record,
    columnIds
))

const or = (
    ...conditions
) => (
    record,
    columnIds
) => conditions.any((condition) => condition(
    record,
    columnIds
))

export {
    eq,
    neq,
    gt,
    gte,
    lt,
    lte,
    and,
    or
}
