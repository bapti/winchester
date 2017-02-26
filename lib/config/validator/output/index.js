'use strict'

const has = require('../../../utils/array/has')

const validateLocalOutput = require('./local')
const validateStatsDOutput = require('./statsd')

const validateOutput = (outputConfig) => {
  if (outputConfig === null || outputConfig === undefined) return true

  if (typeof outputConfig !== 'object') throw new Error('Output config must be an object')

  const outputConfigKeys = Object.keys(outputConfig)
  if(!haslocalOrStatsD(outputConfigKeys)) throw new Error('Output config must specify either local or StatsD output options')

  return validateLocalOutput(outputConfig.local) && validateStatsDOutput(outputConfig.statsD)
}

const hasLocal = configKeys => has(configKeys)('local')
const hasStatsD = configKeys => has(configKeys)('statsD')
const haslocalOrStatsD = keys => hasLocal(keys) || hasStatsD(keys)

module.exports = validateOutput
