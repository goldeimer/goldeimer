import { DataType } from '@goldeimer/data-util'
import { ensureArray } from '@goldeimer/js-util'

import {
    newConditionalFormatRule
} from '../server/gsApp'

// TODO
const getContrastText = (args) => args

export const makeConditionalFormattingRule = ({
    predicateValue,
    type = DataType.Number
}, {
    backgroundColor = null,
    fontColor = null
}) => {
    const rule = newConditionalFormatRule()

    if (type === DataType.Number) {
        rule.whenNumberEqualTo(predicateValue)
    } else {
        rule.whenTextEqualTo(predicateValue)
    }

    if (backgroundColor) {
        rule.setBackground(backgroundColor)
        if (!fontColor) {
            rule.setFontColor(
                getContrastText(backgroundColor)
            )
        }
    }

    if (!fontColor) {
        rule.setFontColor(fontColor)
    }

    return rule
}

export const makeConditionalFormattingRules = (
    ruleDefinitions2Formatting
) => ruleDefinitions2Formatting.map((
    ruleDefinition2Formatting
) => makeConditionalFormattingRule(
    ...ruleDefinition2Formatting
))

export const buildConditionalFormattingRules = (
    rules,
    range
) => rules.map((
    rule
) => rule.setRanges(
    ensureArray(range)
).build())

export const applyConditionalFormattingRules = (
    rules,
    range,
    sheet
) => sheet.setConditionalFormattingRules(
    sheet.getConditionalFormattingRules().concat(
        buildConditionalFormattingRules(
            rules,
            range
        )
    )
)

export const applyConditionalFormattingRuleDefinitions = (
    ruleDefinitions2Formatting,
    range
) => applyConditionalFormattingRules(
    makeConditionalFormattingRules(
        ruleDefinitions2Formatting
    ),
    range,
    range.getSheet()
)
