import { isNumber } from 'typechecker'
import validUrl from 'valid-url'

import { DATA_TYPE } from '@gs/enum'

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
        case DATA_TYPE.bool:
            return value === true || value === false

        case DATA_TYPE.color:
            return isColor(value)

        case DATA_TYPE.email:
            return isEmail(value)

        case DATA_TYPE.enum:
            return dataTypeArg
                ? dataTypeArg.isDefined(value)
                : isInteger(value)

        case DATA_TYPE.foreignKey:
            return dataTypeArg
                ? dataTypeArg.includes(value)
                : isUuid(value)

        case DATA_TYPE.icon:
            return isIconId(value)

        case DATA_TYPE.integer:
            return isInteger(value)

        case DATA_TYPE.latitude:
            return isNumber(value) && value >= -90 && value <= 90

        case DATA_TYPE.longitude:
            return isNumber(value) && value >= 0 && value <= 360

        case DATA_TYPE.number:
            return isNumber(value)

        case DATA_TYPE.phone:
            return isPhoneNumber(value)

        case DATA_TYPE.text:
            return true

        case DATA_TYPE.url:
            return validUrl.isWebUri(value)

        case DATA_TYPE.uuid:
            return isUuid(value)

        default:
            return true
    }
}

export default isDataType
