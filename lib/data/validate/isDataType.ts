import { isNumber } from 'typechecker'
import { isWebUri } from 'valid-url'

import { DataType } from '../data-util/src/enum'

// TODO: Implement.
const AVAILABLE_ICON_IDS = new Set<string>([])

const isColor = (value: string) => value.match(
    /^(#[0-9a-fA-F]{3})|(#[0-9a-fA-F]{6})$/
)

const isEmail = (value: string) => value.match(
    /* eslint-disable-next-line max-len */
    /^(([^<>()[]\\.,;:\s@"]+(\.[^<>()[]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
)

const isIconId = (value: string) => AVAILABLE_ICON_IDS.has(value)

const isInteger = (value: string) => (
    isNumber(value) &&
    Math.round(parseInt(value)).toString() === value
)

const isPhoneNumber = (value: string) => value.match(
    /^\+?[-0-9/\s]{7,}$/
)

const isUuid = (value: string) => value.match(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
)

export const isDataType = (
    value: string,
    dataType: DataType
    // dataTypeArg = null
) => {
    switch (dataType) {
        case DataType.Bool:
            return [
                '0',
                '1',
                'false',
                'true'
            ].includes(value)

        case DataType.Color:
            return isColor(value)

        case DataType.Email:
            return isEmail(value)

        case DataType.Enum:
            return isInteger(value)

        case DataType.ForeignKey:
            return isUuid(value)

        case DataType.Icon:
            return isIconId(value)

        case DataType.Integer:
            return isInteger(value)

        case DataType.Latitude: {
            const floatValue = parseFloat(value)

            return isNumber(value) && floatValue >= -90 && floatValue <= 90
        }

        case DataType.Longitude: {
            const floatValue = parseFloat(value)

            return isNumber(value) && floatValue >= 0 && floatValue <= 360
        }

        case DataType.Number:
            return isNumber(value)

        case DataType.PhoneNumber:
            return isPhoneNumber(value)

        case DataType.Text:
            return true

        case DataType.Url:
            return isWebUri(value)

        case DataType.Uuid:
            return isUuid(value)

        default:
            return true
    }
}
