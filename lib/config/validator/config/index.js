'use strict'

const has = require('../../../utils/array/has')
const is = require('../../../utils/is')
const isObj = is.isObj
const isStr = is.isStr

const validateConfig = (config) => {
  const configKeys = Object.keys(config)

  if (!hasTitle(configKeys)) throw new Error('Config has no title.')
  if (!isStr(config.title)) throw new Error('Config title is not a string.')

  if (!hasTargets(configKeys)) throw new Error('Config has no targets.')
  if (!Array.isArray(config.targets)) throw new Error('Targets is not an array.')

  if (hasOutput(configKeys) && !isObj(config.output)) throw new Error('Output is not an object.')

  return true
}

const hasTitle = keys => has(keys)('title')
const hasTargets = keys => has(keys)('targets')
const hasOutput = keys => has(keys)('output')

module.exports = validateConfig
