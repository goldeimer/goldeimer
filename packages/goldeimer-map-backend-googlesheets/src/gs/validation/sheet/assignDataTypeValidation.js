import { DATA_TYPE } from '@gs/enum'

// TODO: Implement.
const AVAILABLE_ICON_IDS = new Set([])

const assignDataTypeValidation = (
    dataValidation,
    dataType,
    dataTypeArg,
    a1Notation
) => {
    switch (dataType) {
        case DATA_TYPE.bool:
            return dataValidation.requireFormulaSatisfied(
                `=ISLOGICAL(${a1Notation})`
            )

        case DATA_TYPE.color:
            return dataValidation.requireFormulaSatisfied(
                `=REGEXMATCH(${a1Notation}, "^(#[0-9a-fA-F]{3})|(#[0-9a-fA-F]{6})$")`
            )

        case DATA_TYPE.email:
            return dataValidation.requireTextIsEmail()

        case DATA_TYPE.enum:
            if (dataTypeArg) {
                dataValidation.requireValueInList(dataTypeArg)
            }

            return dataValidation

        case DATA_TYPE.foreignKey:
            if (dataTypeArg) {
                dataValidation.requireValueInRange(dataTypeArg)
            }

            return dataValidation

        case DATA_TYPE.icon:
            return dataValidation.requireValueInList(AVAILABLE_ICON_IDS)

        case DATA_TYPE.integer:
            return dataValidation.requireFormulaSatisfied(
                `=AND(ISNUMBER(${a1Notation}), EQ(${a1Notation}, INT(${a1Notation})))`
            )

        case DATA_TYPE.latitude:
            return dataValidation.requireNumberBetween(-90, 90)

        case DATA_TYPE.longitude:
            return dataValidation.requireNumberBetween(0, 360)

        case DATA_TYPE.number:
            return dataValidation.requireFormulaSatisfied(
                `=ISNUMBER(${a1Notation})`
            )

        case DATA_TYPE.phone:
            return dataValidation.requireFormulaSatisfied(
                `=REGEXMATCH(${a1Notation}, "^\\+?[-0-9/\\s]{7,}")`
            )

        case DATA_TYPE.text:
            return dataValidation.requireFormulaSatisfied(
                `=ISTEXT(${a1Notation})`
            )

        case DATA_TYPE.url:
            return dataValidation.requireTextIsUrl()

        case DATA_TYPE.uuid:
            return dataValidation.requireFormulaSatisfied(
                `=REGEXMATCH(${a1Notation}, "^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$")`
            )

        default:
            return dataValidation
    }
}

export default assignDataTypeValidation
