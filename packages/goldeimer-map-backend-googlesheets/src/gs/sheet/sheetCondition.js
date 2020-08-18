const isRangeASingleCell = (
    range
) => (
    range &&
    range.getNumColumns() === 1 &&
    range.getNumRows() === 1
)

export {
    /* eslint-disable-next-line import/prefer-default-export */
    isRangeASingleCell
}
