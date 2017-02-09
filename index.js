#! /usr/bin/env node

'use strict'

const program = require('commander')
const version = require('./package.json').version
const winchester = require('./lib')

program
  .version(version)

program
  .command('fire [repeat] [configPath]')
  .description('Run Winchester the specified number of times using the config file specified')
  .action((repeat, configPath) => {
    const { targets, output } = winchester.aim(configPath, repeat)
    winchester.fire(targets, output, configPath)
  })

program
  .parse(process.argv)
