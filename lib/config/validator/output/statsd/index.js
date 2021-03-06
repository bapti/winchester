'use strict'

const has = require('../../../../utils/array/has')
const is = require('../../../../utils/is')
const isNum = is.isNum
const isObj = is.isObj
const isStr = is.isStr

const validateStatsDOutput = (statsDOutputConfig) => {
  if (statsDOutputConfig === null || statsDOutputConfig === undefined) return true

  if (!isObj(statsDOutputConfig)) throw new Error('StatsD config must be an object')

  const statsDOutputConfigKeys = Object.keys(statsDOutputConfig)

  if (!hasHost(statsDOutputConfigKeys)) throw new Error('StatsD host must be specified')
  if (!isStr(statsDOutputConfig.host)) throw new Error('StatsD host must be a string')

  if (!hasPort(statsDOutputConfigKeys)) throw new Error('StatsD port must be specified')
  if (!isNum(statsDOutputConfig.port)) throw new Error('StatsD port must be an integer')

  if (!hasPrefix(statsDOutputConfigKeys)) throw new Error('StatsD prefix must be specified')
  if (!isStr(statsDOutputConfig.prefix)) throw new Error('StatsD prefix must be a string')

  return true
}

const hasHost = keys => has(keys)('host')
const hasPort = keys => has(keys)('port')
const hasPrefix = keys => has(keys)('prefix')

module.exports = validateStatsDOutput
