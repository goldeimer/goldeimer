import { DataType } from '../enum'

// TODO: Implement.
const AVAILABLE_ICON_IDS = new Set([])

const assignDataTypeValidation = (
    dataValidation,
    dataType,
    dataTypeArg,
    a1Notation
) => {
    switch (dataType) {
    case DataType.Bool:
        return dataValidation.requireFormulaSatisfied(
            `=ISLOGICAL(${a1Notation})`
        )

    case DataType.color:
        return dataValidation.requireFormulaSatisfied(
            `=REGEXMATCH(${a1Notation}, "^(#[0-9a-fA-F]{3})|(#[0-9a-fA-F]{6})$")`
        )

    case DataType.Email:
        return dataValidation.requireTextIsEmail()

    case DataType.Enum:
        if (dataTypeArg) {
            dataValidation.requireValueInList(dataTypeArg)
        }

        return dataValidation

    case DataType.ForeignKey:
        if (dataTypeArg) {
            dataValidation.requireValueInRange(dataTypeArg)
        }

        return dataValidation

    case DataType.icon:
        return dataValidation.requireValueInList(AVAILABLE_ICON_IDS)

    case DataType.Integer:
        return dataValidation.requireFormulaSatisfied(
            `=AND(ISNUMBER(${a1Notation}), EQ(${a1Notation}, INT(${a1Notation})))`
        )

    case DataType.latitude:
        return dataValidation.requireNumberBetween(-90, 90)

    case DataType.longitude:
        return dataValidation.requireNumberBetween(0, 360)

    case DataType.Number:
        return dataValidation.requireFormulaSatisfied(
            `=ISNUMBER(${a1Notation})`
        )

    case DataType.PhoneNumber:
        return dataValidation.requireFormulaSatisfied(
            `=REGEXMATCH(${a1Notation}, "^\\+?[-0-9/\\s]{7,}")`
        )

    case DataType.Text:
        return dataValidation.requireFormulaSatisfied(
            `=ISTEXT(${a1Notation})`
        )

    case DataType.Url:
        return dataValidation.requireTextIsUrl()

    case DataType.uuid:
        return dataValidation.requireFormulaSatisfied(
            `=REGEXMATCH(${a1Notation}, "^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$")`
        )

    default:
        return dataValidation
    }
}

export default assignDataTypeValidation
