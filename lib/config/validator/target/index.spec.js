'use strict'

const tap = require('tap')
const test = tap.test

const { validateTarget } = require('.')

test('validateTarget', (t) => {
  t.plan(14)

  const noTitleInput = {}
  t.throws(() => { validateTarget(noTitleInput) }, Error('Target has no title.'))

  const invalidTitleInput = {title: 155}
  t.throws(() => { validateTarget(invalidTitleInput) }, Error('Target title is not a string.'))

  const noUrlInput = {title: 'title'}
  t.throws(() => { validateTarget(noUrlInput) }, Error('Target has no url.'))

  const invalidUrlInput = {title: 'title', url: 155}
  t.throws(() => { validateTarget(invalidUrlInput) }, Error('Target url is not a string.'))

  const invalidConnections = {title: 'title', url: 'url', connections: 'not an int'}
  t.throws(() => { validateTarget(invalidConnections) }, Error('Connections is not an integer.'))

  const invalidPipelining = {title: 'title', url: 'url', pipelining: 'not an int'}
  t.throws(() => { validateTarget(invalidPipelining) }, Error('Pipelining is not an integer.'))

  const invalidDuration = {title: 'title', url: 'url', duration: 'not an int'}
  t.throws(() => { validateTarget(invalidDuration) }, Error('Duration is not an integer.'))

  const invalidMethod = {title: 'title', url: 'url', method: 'not method'}
  t.throws(() => { validateTarget(invalidMethod) }, Error('Method is not a valid choice from the approved list.'))

  const invalidHeaders = {title: 'title', url: 'url', headers: 123}
  t.throws(() => { validateTarget(invalidHeaders) }, Error('Headers is not an object.'))

  const invalidBody = {title: 'title', url: 'url', body: 123}
  t.throws(() => { validateTarget(invalidBody) }, Error('Body is not a string.'))

  const invalidBody_file = {title: 'title', url: 'url', body_file: 123}
  t.throws(() => { validateTarget(invalidBody_file) }, Error('Body_file is not a string.'))

  const invalidBodyInput = {title: 'title', url: 'url', body: 'Body', body_file:'Body file'}
  t.same(validateTarget(invalidBodyInput), false)

  const invalidId_replacement = {title: 'title', url: 'url', id_replacement: 123}
  t.throws(() => { validateTarget(invalidId_replacement) }, Error('Id_replacement is not a boolean.'))

  const validTarget = {title: 'title', url: 'url', connections: 123, pipelining: 123, duration: 123, method:'PUT', header: {headerOb:'header'}, body:'', body_file: '', id_replacement: true}
  t.same(validateTarget(validTarget), true)
})
