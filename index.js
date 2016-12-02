#! /usr/bin/env node

'use strict'

const program = require('commander')
const version = require('./package.json').version
const winchester = require('./lib')

program
  .version(version)

program
  .command('fire [timesToFire] [targetingInfo]')
  .description('Fire Winchester the specified number of times using the specified targeting information')
  .action((timesToFire, targetingInfo) => {
    const { targets, output } = winchester.aim(targetingInfo)
    winchester.fire(timesToFire, targets, output, targetingInfo)
  })

program
  .parse(process.argv)
