const formatSheet = (
    sheet
) => sheet.getRange(
    1,
    1,
    sheet.getMaxRows(),
    sheet.getMaxColumns()
)
    .setFontFamily('Roboto Slab')
    .setFontSize(11)

export default formatSheet
