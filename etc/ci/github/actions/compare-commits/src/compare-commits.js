import core from '@actions/core'
import github from '@actions/github'
import {
    compile as etaCompile,
    getConfig as etaConfig,
    templates as etaTemplates
} from 'eta'

import commit from 'ddd/commit.md.in.ejs'
import results from './template/md/results.md.in.ejs'

import fetchCompareCommits from './fetchCompareCommits'
import normalizeCommits from './normalizeCommits'

const ETA_CONFIG = etaConfig({
    varName: 'args'
})

const compileTemplate = (template) => etaCompile(
    template,
    ETA_CONFIG
)

const registerTemplate = (
    name,
    template
) => etaTemplates.define(
    name,
    compileTemplate(template)
)

registerTemplate(
    'partial.commit',
    commit
)

const renderRresults = compileTemplate(results)

const run = async () => {
    try {
        // const githubToken = core.getInput('githubToken')

        const { payload } = github.context.event
        const {
            after: head,
            before: base,
            created,
            organization,
            pusher,
            repository,
            ref
        } = payload

        if (!created) {
            return
        }

        const { commits } = await fetchCompareCommits(
            base,
            head
        )

        core.setOutput(
            'text',
            renderRresults({
                commits: normalizeCommits(commits),
                organization,
                pusher,
                repository,
                ref
            })
        )
    } catch (error) {
        core.setFailed(error.message)
    }
}

run()
