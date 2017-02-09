'use strict'

const yaml = require('js-yaml')

const validateYaml = (config) => {
  return yaml.safeLoad(config)
}

module.exports = { validateYaml }
