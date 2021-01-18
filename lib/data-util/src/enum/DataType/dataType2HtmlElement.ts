import {
    htmlFormElement,
    HtmlFormElement,
    HtmlFormTagName,
    HtmlInputType
} from '@goldeimer/ui-form-util'

import { DataType } from './DataType'

export const dataType2HtmlElement = (
    dataType: DataType
): HtmlFormElement => {
    switch (dataType) {
    case DataType.Color:
        return htmlFormElement(
            HtmlFormTagName.Input,
            HtmlInputType.Color
        )

    case DataType.Date:
        return htmlFormElement(
            HtmlFormTagName.Input,
            HtmlInputType.Date
        )

    case DataType.Email:
        return htmlFormElement(
            HtmlFormTagName.Input,
            HtmlInputType.Email
        )

    case DataType.File:
        return htmlFormElement(
            HtmlFormTagName.Input,
            HtmlInputType.File
        )

    case DataType.Month:
        return htmlFormElement(
            HtmlFormTagName.Input,
            HtmlInputType.Month
        )

    case DataType.Number:
        return htmlFormElement(
            HtmlFormTagName.Input,
            HtmlInputType.Number
        )

    case DataType.Password:
        return htmlFormElement(
            HtmlFormTagName.Input,
            HtmlInputType.Password
        )

    case DataType.PhoneNumber:
        return htmlFormElement(
            HtmlFormTagName.Input,
            HtmlInputType.Tel
        )

    case DataType.Time:
        return htmlFormElement(
            HtmlFormTagName.Input,
            HtmlInputType.Time
        )

    case DataType.Url:
        return htmlFormElement(
            HtmlFormTagName.Input,
            HtmlInputType.Url
        )

    case DataType.Week:
        return htmlFormElement(
            HtmlFormTagName.Input,
            HtmlInputType.Week
        )

    default:
        return htmlFormElement(
            HtmlFormTagName.Input,
            HtmlInputType.Text
        )
    }
}
