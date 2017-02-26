'use strict'

const read = require('./reader')
const validate = require('./validator')
const buildTargets = require('./builder')

const load = (configPath, repeat) => {
  /* eslint-disable no-console */
  console.log('\nReading config file')
  /* eslint-enable no-console */

  const str = read(configPath)
  /* eslint-disable no-console */
  console.log('Config file read, validating.')
  /* eslint-enable no-console */

  const config = validate(str)
  /* eslint-disable no-console */
  console.log('Config file validated, building targets.')
  /* eslint-enable no-console */

  const targets = buildTargets(config, repeat)
  /* eslint-disable no-console */
  console.log('Targets built, firing sequence imminent.')
  /* eslint-enable no-console */

  return {
    title: config.title,
    targets: targets,
    output: config.output
  }
}

module.exports = load
