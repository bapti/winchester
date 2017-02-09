'use strict'

const { validateYaml } = require('./yaml')

const validate = (yaml) => {
  const config = validateYaml(yaml)
  // check for array of target(s)
  // check each target for valid target configuration
  // check for zero or one output configuration
  // check for valid output configuration

  return config
}

module.exports = validate
