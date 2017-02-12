'use strict'

const validateTarget = (target) => {
  const targetKeys = Object.keys(target)

  if (!targetKeys.includes('title')) throw new Error('Target has no title.')
  if (typeof target.title !== 'string') throw new Error('Target title is not a string.')

  if (!targetKeys.includes('url')) throw new Error('Target has no url.')
  if (typeof target.url !== 'string') throw new Error('Target url is not a string.')

  if (targetKeys.includes('connections') && typeof target.connections !== 'number') throw new Error('Connections is not an integer.')
  if (targetKeys.includes('pipelining') && typeof target.pipelining !== 'number') throw new Error('Pipelining is not an integer.')
  if (targetKeys.includes('duration') && typeof target.duration !== 'number') throw new Error('Duration is not an integer.')

  var methodSelection = ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS', 'TRACE', 'PATCH']
  if (targetKeys.includes('method') && !methodSelection.includes(target.method)) throw new Error('Method is not a valid choice from the approved list.')

  if (targetKeys.includes('headers') && typeof target.headers !== 'object') throw new Error('Headers is not an object.')

  if (targetKeys.includes('body') && typeof target.body !== 'string') throw new Error('Body is not a string.')
  if (targetKeys.includes('body_file') && typeof target.body_file !== 'string') throw new Error('Body_file is not a string.')

  if(targetKeys.includes('body') && targetKeys.includes('body_file') && target.body !== '' && target.body_file !== ''){
    console.error('Either body or body_file should be an empty string.');
    return false
  }

  if (targetKeys.includes('id_replacement') && typeof target.id_replacement !== 'boolean') throw new Error('Id_replacement is not a boolean.')

  return true
}

module.exports = { validateTarget }
