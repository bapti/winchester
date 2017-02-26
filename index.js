#! /usr/bin/env node

'use strict'

const program = require('commander')
const version = require('./package.json').version

const lib = require('./lib')
const load = lib.load
const run = lib.run

program
  .version(version)

program
  .command('fire [repeat] [configPath]')
  .description('Run Winchester the specified number of times using the config file specified')
  .action((repeat, configPath) => {
    const config = load(configPath, repeat)
    const title = config.title
    const targets = config.targets
    const output = config.output
    
    run(title, targets, repeat, output)
  })

program
  .parse(process.argv)
