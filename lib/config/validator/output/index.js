'use strict'

const { validateLocalOutput } = require('./local')
const { validateStatsDOutput } = require('./statsd')

const validateOutput = (outputConfig) => {
  if (outputConfig === null || outputConfig === undefined) return true

  if (typeof outputConfig !== 'object') throw new Error('Output config must be an object')

  const outputConfigKeys = Object.keys(outputConfig)
  if(!haslocalOrStatsD(outputConfigKeys)) throw new Error('Output config must specify either local or StatsD output options')

  return validateLocalOutput(outputConfig.local) && validateStatsDOutput(outputConfig.statsD)
}

const haslocalOrStatsD = keys => keys.includes('local') || keys.includes('statsD')

module.exports = { validateOutput }
