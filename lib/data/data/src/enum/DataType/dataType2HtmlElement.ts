
import type {
    FormElementArgs
} from '@goldeimer/ui-form-util'

import {
    handleUndefined,
    mapEnumValueFunction
} from '@goldeimer/enum'
import {
    formElement,
    HtmlFormTag,
    HtmlInputType
} from '@goldeimer/ui-form-util'

import { DataType } from './DataType'

const defaultFormElementArgs: FormElementArgs = [
    HtmlFormTag.Input,
    HtmlInputType.Text
]

export const dataType2FormElementArgs = mapEnumValueFunction({
    [DataType.Unspecified]: [
        HtmlFormTag.Input
    ],
    [DataType.Bool]: [
        HtmlFormTag.Radio
    ],
    [DataType.Color]: [
        HtmlFormTag.Input,
        HtmlInputType.Color
    ],
    [DataType.Date]: [
        HtmlFormTag.Input,
        HtmlInputType.Date
    ],
    [DataType.Day]: [
        HtmlFormTag.Input,
        HtmlInputType.Number
    ],
    [DataType.Email]: [
        HtmlFormTag.Input,
        HtmlInputType.Email
    ],
    [DataType.Enum]: [
        HtmlFormTag.Select
    ],
    [DataType.File]: [
        HtmlFormTag.Input,
        HtmlInputType.File
    ],
    [DataType.ForeignKey]: [
        HtmlFormTag.Select
    ],
    [DataType.ForeignKeyId]: [
        HtmlFormTag.Select
    ],
    [DataType.Icon]: [
        HtmlFormTag.Select
    ],
    [DataType.Integer]: [
        HtmlFormTag.Input,
        HtmlInputType.Number
    ],
    [DataType.Latitude]: [
        HtmlFormTag.Input,
        HtmlInputType.Number
    ],
    [DataType.Longitude]: [
        HtmlFormTag.Input,
        HtmlInputType.Number
    ],
    [DataType.Month]: [
        HtmlFormTag.Input,
        HtmlInputType.Month
    ],
    [DataType.Number]: [
        HtmlFormTag.Input,
        HtmlInputType.Number
    ],
    [DataType.Password]: [
        HtmlFormTag.Input,
        HtmlInputType.Password
    ],
    [DataType.PhoneNumber]: [
        HtmlFormTag.Input,
        HtmlInputType.Tel
    ],
    [DataType.Time]: [
        HtmlFormTag.Input,
        HtmlInputType.Time
    ],
    [DataType.TinyInteger]: [
        HtmlFormTag.Input,
        HtmlInputType.Number
    ],
    [DataType.Url]: [
        HtmlFormTag.Input,
        HtmlInputType.Url
    ],
    [DataType.Uuid]: [
        HtmlFormTag.Input
    ],
    [DataType.Week]: [
        HtmlFormTag.Input,
        HtmlInputType.Week
    ],
    [DataType.Year]: [
        HtmlFormTag.Input,
        HtmlInputType.Number
    ],
    [DataType.Text]: defaultFormElementArgs,
    [handleUndefined]: defaultFormElementArgs
})

export const dataType2FormElement = (
    dataType: DataType
) => formElement(dataType2FormElementArgs(dataType))
