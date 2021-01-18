import {
    HtmlFormTag,
    HtmlInputType
} from '../enum'

export interface IFormElement {
    htmlTag: HtmlFormTag,
    inputType?: HtmlInputType
}

export class FormElement implements IFormElement {
    htmlTag: HtmlFormTag = HtmlFormTag.Input
    inputType?: HtmlInputType = HtmlInputType.Text
}

export type FormElementArgs = [
    HtmlFormTag,
    HtmlInputType?
]

export const formElement = (
    [htmlTag, inputType]: FormElementArgs
): FormElement => ({
    htmlTag,
    inputType
})
