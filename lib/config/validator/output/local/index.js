'use strict'

const { has } = require('../../../../utils/array/has')
const { isBool, isObj } = require('../../../../utils/is')

const validateLocalOutput = (localOutputConfig) => {
  if (localOutputConfig === null || localOutputConfig === undefined) return true

  if (!isObj(localOutputConfig)) throw new Error('Local config must be an object')

  const localOutputConfigKeys = Object.keys(localOutputConfig)

  if (!hasResponseTime(localOutputConfigKeys)) throw new Error('Local responseTime must be specified')
  if (!isBool(localOutputConfig.responseTime)) throw new Error('Local responseTime must be a boolean')

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

  return true
}

const hasResponseTime = keys => has(keys)('responseTime')
const hasMeanMinMax = keys => has(keys)('meanMinMax')
const hasPercentiles = keys => has(keys)('percentiles')
const hasThroughput = keys => has(keys)('throughput')
const hasTimeouts = keys => has(keys)('timeouts')
const hasErrors = keys => has(keys)('errors')

module.exports = { validateLocalOutput }
