'use strict'

const path = require('path')

const { has } = require('../../../../utils/array/has')
const { isBool, isObj, isStr } = require('../../../../utils/is')

const validateLocalOutput = (localOutputConfig) => {
  if (localOutputConfig === null || localOutputConfig === undefined) return true

  if (!isObj(localOutputConfig)) throw new Error('Local config must be an object')

  const localOutputConfigKeys = Object.keys(localOutputConfig)

  if (!hasRequests(localOutputConfigKeys)) throw new Error('Local requests must be specified')
  if (!isBool(localOutputConfig.requests)) throw new Error('Local requests must be a boolean')

  if (localOutputConfigKeys.includes('latency')) {
    if (!isObj(localOutputConfig.latency)) throw new Error('Local latency must be an object')

    const localOutputConfigLatencyKeys = Object.keys(localOutputConfig.latency)

    if (!hasMeanMinMax(localOutputConfigLatencyKeys)) throw new Error('Local latency meanMinMax must be specified')
    if (!isBool(localOutputConfig.latency.meanMinMax)) throw new Error('Local latency meanMinMax must be a boolean')

    if (!hasPercentiles(localOutputConfigLatencyKeys)) throw new Error('Local latency percentiles must be specified')
    if (!isBool(localOutputConfig.latency.percentiles)) throw new Error('Local latency percentiles must be a boolean')
  }

  if (!hasThroughput(localOutputConfigKeys)) throw new Error('Local throughput must be specified')
  if (!isBool(localOutputConfig.throughput)) throw new Error('Local throughput must be a boolean')

  if (!hasTimeouts(localOutputConfigKeys)) throw new Error('Local timeouts must be specified')
  if (!isBool(localOutputConfig.timeouts)) throw new Error('Local timeouts must be a boolean')

  if (!hasErrors(localOutputConfigKeys)) throw new Error('Local errors must be specified')
  if (!isBool(localOutputConfig.errors)) throw new Error('Local errors must be a boolean')

  if (!hasPath(localOutputConfigKeys)) throw new Error('Local outputPath must be specified')
  if (!isStr(localOutputConfig.outputPath)) throw new Error('Local outputPath must be a string')
  if (!path.isAbsolute(localOutputConfig.outputPath)) throw new Error('Local outputPath must be absolute')

  return true
}

const hasRequests = keys => has(keys)('requests')
const hasMeanMinMax = keys => has(keys)('meanMinMax')
const hasPercentiles = keys => has(keys)('percentiles')
const hasThroughput = keys => has(keys)('throughput')
const hasTimeouts = keys => has(keys)('timeouts')
const hasErrors = keys => has(keys)('errors')
const hasPath = keys => has(keys)('outputPath')

module.exports = { validateLocalOutput }
