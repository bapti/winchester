'use strict'

const { validateConfig } = require('./config')
const { validateOutput } = require('./output')
const { validateTarget } = require('./target')
const { validateYaml } = require('./yaml')

const validate = (yaml) => {
  const config = validateYaml(yaml)

  validateConfig(config)
  config.targets.forEach(t => validateTarget(t))
  validateOutput(config.output)

  return config
}

module.exports = validate
