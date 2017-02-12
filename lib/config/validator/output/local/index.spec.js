'use strict'

const tap = require('tap')
const test = tap.test

const { validateLocalOutput } = require('.')

test('validateLocalOutput', (t) => {
  t.plan(18)

  const invalidLocal = 122
  t.throws(() => { validateLocalOutput(invalidLocal) }, Error('Local config must be an object'))

  const missingRequests = {}
  t.throws(() => { validateLocalOutput(missingRequests) }, Error('Local requests must be specified'))

  const invalidRequests = { requests: 122 }
  t.throws(() => { validateLocalOutput(invalidRequests) }, Error('Local requests must be a boolean'))

  const missingLatency = { requests: true }
  t.throws(() => { validateLocalOutput(missingLatency) }, Error('Local latency must be specified'))

  const invalidLatency = { requests: false, latency: 122 }
  t.throws(() => { validateLocalOutput(invalidLatency) }, Error('Local latency must be a boolean'))

  const missingThroughput = { requests: false }
  t.throws(() => { validateLocalOutput(missingThroughput) }, Error('Local throughput must be specified'))

  const invalidThroughput = { requests: false, throughput: 122 }
  t.throws(() => { validateLocalOutput(invalidThroughput) }, Error('Local throughput must be a boolean'))

  const missingTimeouts = { requests: false, throughput: false }
  t.throws(() => { validateLocalOutput(missingTimeouts) }, Error('Local timeouts must be specified'))

  const invalidTimeouts = { requests: false, throughput: false, timeouts: 122 }
  t.throws(() => { validateLocalOutput(invalidTimeouts) }, Error('Local timeouts must be a boolean'))

  const missingErrors = { requests: false, throughput: false, timeouts: false }
  t.throws(() => { validateLocalOutput(missingErrors) }, Error('Local errors must be specified'))

  const invalidErrors = { requests: false, throughput: false, timeouts: false, errors: 122 }
  t.throws(() => { validateLocalOutput(invalidErrors) }, Error('Local errors must be a boolean'))

  const missingOutputPath = { requests: false, throughput: false, timeouts: false, errors: false }
  t.throws(() => { validateLocalOutput(missingOutputPath) }, Error('Local outputPath must be specified'))

  const invalidOutputPath = { requests: false, throughput: false, timeouts: false, errors: false, outputPath: 122 }
  t.throws(() => { validateLocalOutput(invalidOutputPath) }, Error('Local outputPath must be a string'))

  const relativeOutputPath = { requests: false, throughput: false, timeouts: false, errors: false, outputPath: '~/user' }
  t.throws(() => { validateLocalOutput(relativeOutputPath) }, Error('Local outputPath must be absolute'))

  t.same(true, validateLocalOutput(null))
  t.same(true, validateLocalOutput(undefined))

  const validLocal = {
    requests: false,
    latency: { meanMinMax: false, percentiles: false },
    throughput: false,
    timeouts: false,
    errors: false,
    outputPath: '/'
  }
  t.same(true, validateLocalOutput(validLocal))

  const validLocalNoLatency = {
    requests: false,
    latency: { meanMinMax: false, percentiles: false },
    throughput: false,
    timeouts: false,
    errors: false,
    outputPath: '/'
  }
  t.same(true, validateLocalOutput(validLocalNoLatency))
})
