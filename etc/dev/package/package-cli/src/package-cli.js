#!/usr/bin/env node

/// <reference types="node" />

const { Command } = require('commander')
const { updateManifest } = require('@goldeimer/manifest')

const program = new Command()

program
    .version('0.0.1')
    .description('Goldeimer\'s package management utilitity')

program
    .command('update <path>')
    .alias('u')
    .description('update the `package.json` manifest file under the specified path')
    .action(updateManifest)

program.parse(process.argv)
