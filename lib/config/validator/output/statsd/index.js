'use strict'

const { has } = require('../../../../utils/array/has')
const { isNum, isObj, isStr } = require('../../../../utils/is')

const validateStatsDOutput = (statsDOutputConfig) => {
  if (statsDOutputConfig === null || statsDOutputConfig === undefined) return true

  if (!isObj(statsDOutputConfig)) throw new Error('StatsD config must be an object')

  const statsDOutputConfigKeys = Object.keys(statsDOutputConfig)

  if (!hasHost(statsDOutputConfigKeys)) throw new Error('StatsD host must be specified')
  if (!isStr(statsDOutputConfig.host)) throw new Error('StatsD host must be a string')

  if (!hasPort(statsDOutputConfigKeys)) throw new Error('StatsD port must be specified')
  if (!isNum(statsDOutputConfig.port)) throw new Error('StatsD port must be an integer')

  if (!hasPrefix(statsDOutputConfigKeys)) throw new Error('StatsD globalPrefix must be specified')
  if (!isStr(statsDOutputConfig.globalPrefix)) throw new Error('StatsD globalPrefix must be a string')

  return true
}

const hasHost = keys => has(keys)('host')
const hasPort = keys => has(keys)('port')
const hasPrefix = keys => has(keys)('globalPrefix')

module.exports = { validateStatsDOutput }
