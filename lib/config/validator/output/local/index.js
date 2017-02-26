'use strict'

const path = require('path')

const has = require('../../../../utils/array/has')
const is = require('../../../../utils/is')
const isBool = is.isBool
const isObj = is.isObj
const isStr = is.isStr

const validateLocalOutput = (localOutputConfig) => {
  if (localOutputConfig === null || localOutputConfig === undefined) return true

  if (!isObj(localOutputConfig)) throw new Error('Local config must be an object')

  const localOutputConfigKeys = Object.keys(localOutputConfig)

  if (!hasRequests(localOutputConfigKeys)) throw new Error('Local requests must be specified')
  if (!isBool(localOutputConfig.requests)) throw new Error('Local requests must be a boolean')

  if (!hasLatency(localOutputConfigKeys)) throw new Error('Local latency must be specified')
  if (!isBool(localOutputConfig.latency)) throw new Error('Local latency must be a boolean')

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
const hasLatency = keys => has(keys)('latency')
const hasThroughput = keys => has(keys)('throughput')
const hasTimeouts = keys => has(keys)('timeouts')
const hasErrors = keys => has(keys)('errors')
const hasPath = keys => has(keys)('outputPath')

module.exports = validateLocalOutput
