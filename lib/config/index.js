'use strict'

const { read } = require('./reader')
const { validate } = require('./validator')

const readAndValidate = function(configPath) {
  const config = readConfig(configPath)
  validate(config)

  return config
}

module.exports = readAndValidate
