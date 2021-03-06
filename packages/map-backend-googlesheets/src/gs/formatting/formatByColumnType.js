import {
    ColumnType
} from '../enum'

const getColumnTypeColors = (
    columType,
    isHeader
) => {
    switch (columType) {
        case ColumnType.auto.is(columType):
            return isHeader
                ? ['#666', '#eee']
                : ['#eee', '#111']

        case ColumnType.Optional.is(columType):
            return isHeader
                ? ['#444', '#eee']
                : ['#ddd', '#111']

        default:
            return isHeader
                ? ['#222', '#eee']
                : ['#ccc', '#111']
    }
}

const formatByColumnType = (
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

export default formatByColumnType
