'use strict'

const fs = require('fs')
const path = require('path')

const tap = require('tap')
const test = tap.test

const validateYaml = require('.')

const opts = { encoding: 'utf8', flag: 'r' }

const validYamlPath = path.join(__dirname, 'examples/valid.yaml')
const validYaml = fs.readFileSync(validYamlPath, opts)

const invalidYamlPath = path.join(__dirname, 'examples/invalid.yaml')
const invalidYaml = fs.readFileSync(invalidYamlPath, opts)

test('validateYaml', (t) => {
  t.plan(2)

  const result = { test: { field: 'I am a valid yaml file' } }
  const actual = validateYaml(validYaml)

  t.same(actual, result)

  t.throws(() => { validateYaml(invalidYaml) }, Error)
})
