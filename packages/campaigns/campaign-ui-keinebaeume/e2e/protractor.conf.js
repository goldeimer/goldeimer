// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

import path from 'path'
const { SpecReporter } = require('jasmine-spec-reporter')
const tsNode = require('ts-node')

/**
 * @type { import("protractor").Config }
 */
exports.config = {
    allScriptsTimeout: 11000,
    specs: [
        './src/**/*.e2e-spec.ts'
    ],
    capabilities: {
        browserName: 'chrome'
    },
    directConnect: true,
    baseUrl: 'http://localhost:4200/',
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        /* eslint-disable-next-line @typescript-eslint/no-empty-function */
        print: () => {}
    },
    onPrepare: () => {
        tsNode.register({
            project: path.join(__dirname, './tsconfig.json')
        })

        /* eslint-disable-next-line no-undef */
        jasmine.getEnv().addReporter(
            new SpecReporter({
                spec: {
                    displayStacktrace: true
                }
            })
        )
    }
}
