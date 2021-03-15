const formatEmphasis = (
    range
) => range.setFontWeight('bold')

const formatFootnote = (
    range
) => range.setFontSize(9)

const formatTableName = (
    range
) => range.setFontSize(12)

export {
    formatEmphasis,
    formatFootnote,
    formatTableName
}
