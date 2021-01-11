import type {
    HtmlFormTagName,
    HtmlInputType
} from '../enum'

export interface HtmlFormElement {
    inputType: HtmlInputType,
    tagName: HtmlFormTagName
}

export const htmlFormElement = (
    tagName: HtmlFormTagName,
    inputType: HtmlInputType
): HtmlFormElement => ({
    inputType,
    tagName
})
