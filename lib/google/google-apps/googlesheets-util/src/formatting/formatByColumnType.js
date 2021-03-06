import { ColumnType } from '@goldeimer/data-util'

const getColumnTypeColors = (
    columType,
    isHeader
) => {
    switch (columType) {
    case ColumnType.Auto:
        return isHeader
            ? ['#666', '#eee']
            : ['#eee', '#111']

    case ColumnType.Optional:
        return isHeader
            ? ['#444', '#eee']
            : ['#ddd', '#111']

    default:
        return isHeader
            ? ['#222', '#eee']
            : ['#ccc', '#111']
    }
}

export const formatByColumnType = (
    range,
    columType,
    isHeader
) => {
    const [
        backgroundColor,
        fontColor
    ] = getColumnTypeColors(columType, isHeader)

    range.setBackground(
        backgroundColor
    ).setFontColor(
        fontColor
    )
}
