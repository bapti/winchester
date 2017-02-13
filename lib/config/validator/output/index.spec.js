'use strict'

const tap = require('tap')
const test = tap.test

const { validateOutput } = require('.')

test('validateOutput', (t) => {
  t.plan(8)

  const invalidOutput = 122
  t.throws(() => { validateOutput(invalidOutput) }, Error('Output config must be an object'))

  const noConfig = {}
  t.throws(() => { validateOutput(noConfig) }, Error('Output config must specify either local or StatsD output options'))

  const wrongConfig = { remote: 122, graphite: 123 }
  t.throws(() => { validateOutput(noConfig) }, Error('Output config must specify either local or StatsD output options'))

  t.same(true, validateOutput(null))
  t.same(true, validateOutput(undefined))

  const validLocalOutput = {
    local: {
      requests: false,
      latency: false,
      throughput: false,
      timeouts: false,
      errors: false,
      outputPath: '/'
    }
  }
  t.same(true, validateOutput(validLocalOutput))

  const validStatsDOutput = {
    statsD: {
      host: 'host',
      port: 1234,
      prefix: 'globalPrefix'
    }
  }
  t.same(true, validateOutput(validStatsDOutput))

  const validOutput = {
    local: {
      requests: false,
      latency: false,
      throughput: false,
      timeouts: false,
      errors: false,
      outputPath: '/'
    },
    statsD: {
      host: 'host',
      port: 1234,
      prefix: 'globalPrefix'
    }
  }
  t.same(true, validateOutput(validOutput))
})
