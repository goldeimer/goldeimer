import {
    compile as etaCompile,
    getConfig as etaConfig,
    render as etaRender,
    templates as etaTemplates
} from 'eta'

import config from './markdownlint.json.in'
import cliConfig from './markdownlint-cli2.jsonc.in'

const PUNCTUATION_CHARS = '.,;:!?。，；：！？'
const TITLE_REG_EX_STRING = '^\\s*title\\s*[:=]'

const ETA_CONFIG = etaConfig({
    varName: 'args'
})

const compileTemplate = (template) => etaCompile(
    template,
    ETA_CONFIG
)

const renderedConfig = etaRender(config)
const renderCliConfig = compileTemplate(cliConfig, {
    customRules: [],
    fix: false,
    ignore: [],
    markdownItPlugins: [],
    noInlineConfig: false,
    outputFormatters: []
})

export {
    renderedConfig as default,
    renderCliConfig({ fix: true }) as cliConfigFix,
    renderCliConfig({}) as cliConfigLint
}
