import {
    compile as etaCompile,
    getConfig as etaConfig,
    render as etaRender,
    templates as etaTemplates
} from 'eta'

const ETA_CONFIG = etaConfig({
    varName: 'args'
})

const compileTemplate = (
    template,
    options = {}
) => etaCompile(
    template,
    { ETA_CONFIG, ...options }
)

const registerTemplate = (
    key,
    template,
    options = {}
) => etaTemplates.define(
    key,
    compileTemplate(template)
)

const renderTemplate = (
    template,
    options = {}
) => etaRender(template, options)

export {
    renderTemplate as default,
    compileTemplate,
    registerTemplate,
    renderTemplate
}

export {
    keyValuePairs,
    optionalKeyValuePair
} from './partial'
