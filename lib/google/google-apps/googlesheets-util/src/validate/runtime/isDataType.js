import { isNumber } from 'typechecker'
import validUrl from 'valid-url'

import { DataType } from '../../enum'

// TODO: Implement.
const AVAILABLE_ICON_IDS = new Set([])

const isColor = (value) => value.match(
    /^(#[0-9a-fA-F]{3})|(#[0-9a-fA-F]{6})$/
)

const isEmail = (value) => value.match(
    /* eslint-disable-next-line max-len */
    /^(([^<>()[]\\.,;:\s@"]+(\.[^<>()[]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
)

const isIconId = (value) => AVAILABLE_ICON_IDS.has(value)

const isInteger = (value) => (
    isNumber(value) &&
    Math.round(value) === value
)

const isPhoneNumber = (value) => value.match(
    /^\+?[-0-9/\s]{7,}$/
)

const isUuid = (value) => value.match(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
)

const isDataType = (value, dataType, dataTypeArg = null) => {
    switch (dataType) {
        case DataType.Bool:
            return value === true || value === false

        case DataType.color:
            return isColor(value)

        case DataType.Email:
            return isEmail(value)

        case DataType.Enum:
            return dataTypeArg
                ? dataTypeArg.isDefined(value)
                : isInteger(value)

        case DataType.ForeignKey:
            return dataTypeArg
                ? dataTypeArg.includes(value)
                : isUuid(value)

        case DataType.icon:
            return isIconId(value)

        case DataType.Integer:
            return isInteger(value)

        case DataType.latitude:
            return isNumber(value) && value >= -90 && value <= 90

        case DataType.longitude:
            return isNumber(value) && value >= 0 && value <= 360

        case DataType.Number:
            return isNumber(value)

        case DataType.PhoneNumber:
            return isPhoneNumber(value)

        case DataType.Text:
            return true

        case DataType.Url:
            return validUrl.isWebUri(value)

        case DataType.uuid:
            return isUuid(value)

        default:
            return true
    }
}

export default isDataType
