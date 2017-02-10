'use strict'

const { read } = require('./reader')
const { validate } = require('./validator')
const { buildTargets, buildOutput } = require('./builder')

const load = (configPath, repeat) => {
  const str = read(configPath)
  const config = validate(str)

  const targets = buildTargets(config, repeat)
  const output = buildOutput(config)

  return {
    title: config.title,
    targets: targets,
    output: output
  }
}

module.exports = load
