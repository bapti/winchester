'use strict'

const yaml = require('js-yaml')

const validate = (config) => {
  // check for valid yaml
  // check for valid array of target(s)
  // check each target for valid target configuration
  // check for single output configuration
  // check for valid output configuration

  return yaml.load(config)
}

module.exports = validate
