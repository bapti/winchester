'use strict'

const has = require('../../../utils/array/has')
const stringify = require('../../../utils/array/stringify')
const is = require('../../../utils/is')
const isBool = is.isBool
const isNum = is.isNum
const isObj = is.isObj
const isStr = is.isStr

const validateTarget = (target) => {
  const targetKeys = Object.keys(target)

  if (!hasTitle(targetKeys)) throw new Error('Target config has no title.')
  if (!isStr(target.title)) throw new Error('Target title must be a string.')

  if (!hasUrl(targetKeys)) throw new Error('Target config has no url.')
  if (!isStr(target.url)) throw new Error('Url must be a string.')

  if (hasConnections(targetKeys) && !isNum(target.connections))
    throw new Error('Connections must be an integer.')

  if (hasPipelining(targetKeys) && !isNum(target.pipelining))
    throw new Error('Pipelining must be an integer.')

  if (hasDuration(targetKeys) && !isNum(target.duration))
    throw new Error('Duration must be an integer.')

  if (hasMethod(targetKeys) && !validMethod(target.method))
    throw new Error(`Method must be one of: ${stringify(validMethods)}`)

  if (hasHeaders(targetKeys) && !isObj(target.headers))
    throw new Error('Headers must be an object.')

  if (hasBody(targetKeys) && !isStr(target.body))
    throw new Error('Body must be a string.')

  if (hasBodyFile(targetKeys) && !isStr(target.body_file))
    throw new Error('Body File must be a string.')

  if(hasBody(targetKeys) && hasBodyFile(targetKeys) && target.body !== '' && target.body_file !== '') {
    /* eslint-disable no-console */
    console.error('Body & Body File specified, contents of Body File will be used')
    /* eslint-enable no-console */
  }

  if (hasIdReplacement(targetKeys) && !isBool(target.id_replacement))
    throw new Error('ID Replacement must be a boolean.')

  return true
}

const hasTitle = targetKeys => has(targetKeys)('title')
const hasUrl = targetKeys => has(targetKeys)('url')
const hasConnections = targetKeys => has(targetKeys)('connections')
const hasPipelining = targetKeys => has(targetKeys)('pipelining')
const hasDuration = targetKeys => has(targetKeys)('duration')
const hasMethod = targetKeys => has(targetKeys)('method')
const hasHeaders = targetKeys => has(targetKeys)('headers')
const hasBody = targetKeys => has(targetKeys)('body')
const hasBodyFile = targetKeys => has(targetKeys)('body_file')
const hasIdReplacement = targetKeys => has(targetKeys)('id_replacement')

const validMethods = [ 'GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS', 'TRACE', 'PATCH' ]
const validMethod = method => has(validMethods)(method)

module.exports = validateTarget
