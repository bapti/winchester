'use strict'

const { read } = require('./reader')
const { validate } = require('./validator')
const { buildTargets, buildOutput } = require('./builder')

const load = (configPath, repeat) => {
  console.log('\nReading config file')

  const str = read(configPath)
  console.log('Config file read, validating.')

  const config = validate(str)
  console.log('Config file validated, building targets.')

  const targets = buildTargets(config, repeat)
  console.log('Targets built, firing sequence imminent.')

  return {
    title: config.title,
    targets: targets,
    output: config.output
  }
}

module.exports = { load }
