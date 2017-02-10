#! /usr/bin/env node

'use strict'

const program = require('commander')
const version = require('./package.json').version

const { load, run } = require('./lib')

program
  .version(version)

program
  .command('fire [repeat] [configPath]')
  .description('Run Winchester the specified number of times using the config file specified')
  .action((repeat, configPath) => {
    const { title, targets, output } = load(configPath, repeat)
    run(targets, output)
  })

program
  .parse(process.argv)
