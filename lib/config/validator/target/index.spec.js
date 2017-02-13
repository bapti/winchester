'use strict'

const tap = require('tap')
const test = tap.test

const { validateTarget } = require('.')

test('validateTarget', (t) => {
  t.plan(13)

  const noTitleInput = {}
  t.throws(() => { validateTarget(noTitleInput) }, Error('Target config has no title.'))

  const invalidTitleInput = { title: 155 }
  t.throws(() => { validateTarget(invalidTitleInput) }, Error('Target title must be a string.'))

  const noUrlInput = { title: 'title' }
  t.throws(() => { validateTarget(noUrlInput) }, Error('Target config has no url.'))

  const invalidUrlInput = { title: 'title', url: 155 }
  t.throws(() => { validateTarget(invalidUrlInput) }, Error('Url must be a string.'))

  const invalidConnections = { title: 'title', url: 'url', connections: 'not an int' }
  t.throws(() => { validateTarget(invalidConnections) }, Error('Connections must be an integer.'))

  const invalidPipelining = { title: 'title', url: 'url', pipelining: 'not an int' }
  t.throws(() => { validateTarget(invalidPipelining) }, Error('Pipelining must be an integer.'))

  const invalidDuration = { title: 'title', url: 'url', duration: 'not an int' }
  t.throws(() => { validateTarget(invalidDuration) }, Error('Duration must be an integer.'))

  const invalidMethod = { title: 'title', url: 'url', method: 'not method' }
  t.throws(() => { validateTarget(invalidMethod) }, Error('Method must be one of: GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH'))

  const invalidHeaders = { title: 'title', url: 'url', headers: 123 }
  t.throws(() => { validateTarget(invalidHeaders) }, Error('Headers must be an object.'))

  const invalidBody = { title: 'title', url: 'url', body: 123 }
  t.throws(() => { validateTarget(invalidBody) }, Error('Body must be a string.'))

  const invalidBodyFile = { title: 'title', url: 'url', body_file: 123 }
  t.throws(() => { validateTarget(invalidBodyFile) }, Error('Body File must be a string.'))

  // TODO: add test that ensures warning on body and bodyFile being specified is emitted

  const invalidIdReplacement = { title: 'title', url: 'url', id_replacement: 123 }
  t.throws(() => { validateTarget(invalidIdReplacement) }, Error('ID Replacement must be a boolean.'))

  const validTarget = { title: 'title', url: 'url', connections: 123, pipelining: 123, duration: 123, method:'PUT', header: { headerOb:'header' }, body:'', body_file: '', id_replacement: true }
  t.same(validateTarget(validTarget), true)
})
