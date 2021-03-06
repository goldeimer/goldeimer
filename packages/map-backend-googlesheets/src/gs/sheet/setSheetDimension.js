const calculateTargetSize = (
    desiredSize,
    lastContentIndex
) => (
    lastContentIndex < desiredSize
        ? desiredSize
        : lastContentIndex
)

const makeSetDimensionSize = (dimension) => (
    sheet,
    desiredSize
) => {
    const currentSize = sheet[`getMax${dimension}s`]()
    const lastContentIndex = sheet[`getLast${dimension}`]()

    const targetSize = calculateTargetSize(
        desiredSize,
        lastContentIndex
    )

    if (currentSize === targetSize) {
        return targetSize
    }

    if (targetSize < currentSize) {
        sheet[`delete${dimension}s`](
            lastContentIndex + 1,
            currentSize - lastContentIndex
        )

        return targetSize
    }

    sheet[`insert${dimension}sAfter`](
        currentSize,
        targetSize - currentSize
    )

    return targetSize
}

const setSheetColumns = makeSetDimensionSize('Column')
const setSheetRows = makeSetDimensionSize('Row')
const setSheetDimensions = (
    sheet,
    desiredRowSize,
    desiredColumSize
) => ([
    setSheetRows(sheet, desiredRowSize),
    setSheetColumns(sheet, desiredColumSize)
])

export {
    setSheetDimensions as default,
    setSheetColumns,
    setSheetRows
}
