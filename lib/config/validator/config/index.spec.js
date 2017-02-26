'use strict'

const tap = require('tap')
const test = tap.test

const validateConfig = require('.')

test('validateConfig', (t) => {
  t.plan(6)

  const noTitleInput = {}
  t.throws(() => { validateConfig(noTitleInput) }, Error('Config has no title.'))

  const invalidTitleInput = { title: 122 }
  t.throws(() => { validateConfig(invalidTitleInput) }, Error('Config title is not a string.'))

  const noTargets = { title: 'title' }
  t.throws(() => { validateConfig(noTargets) }, Error('Config has no targets.'))

  const invalidTargets = { title: 'title', targets: 122 }
  t.throws(() => { validateConfig(invalidTargets) }, Error('Targets is not an array.'))

  const invalidOutput = { title: 'title', targets: [ 1, 2, 3 ], output: 122 }
  t.throws(() => { validateConfig(invalidOutput) }, Error('Output is not an object.'))

  const validConfig = { title: 'title', targets: [ 1, 2, 3 ], output: {} }
  t.same(validateConfig(validConfig), true)
})
