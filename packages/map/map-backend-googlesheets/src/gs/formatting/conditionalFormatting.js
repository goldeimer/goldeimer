import defaultTheme from '@config/theme'

import { ensureArray } from '@lib/util'

import { DATA_TYPE } from '@gs/enum'

import {
    newConditionalFormatRule
} from '@gs/server/gsApp'

const { palette: { getContrastText } } = defaultTheme

const makeConditionalFormattingRule = ({
    predicateValue,
    type = DATA_TYPE.number
}, {
    backgroundColor = null,
    fontColor = null
}) => {
    const rule = newConditionalFormatRule()

    if (type === DATA_TYPE.number) {
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

const makeConditionalFormattingRules = (
    ruleDefinitions2Formatting
) => ruleDefinitions2Formatting.map((
    ruleDefinition2Formatting
) => makeConditionalFormattingRule(
    ...ruleDefinition2Formatting
))

const buildConditionalFormattingRules = (
    rules,
    range
) => rules.map((
    rule
) => rule.setRanges(
    ensureArray(range)
).build())

const applyConditionalFormattingRules = (
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

const applyConditionalFormattingRuleDefinitions = (
    ruleDefinitions2Formatting,
    range
) => applyConditionalFormattingRules(
    makeConditionalFormattingRules(
        ruleDefinitions2Formatting
    ),
    range,
    range.getSheet()
)

export {
    applyConditionalFormattingRuleDefinitions,
    buildConditionalFormattingRules,
    makeConditionalFormattingRules
}
