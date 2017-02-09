'use strict'

const tap = require('tap')
const test = tap.test

const { validateLocalOutput } = require('.')

test('validateLocalOutput', (t) => {
  t.plan(21)

  const invalidLocal = 122
  t.throws(() => { validateLocalOutput(invalidLocal) }, Error('Local config must be an object'))

  const missingResponseTime = {}
  t.throws(() => { validateLocalOutput(missingResponseTime) }, Error('Local responseTime must be specified'))

  const invalidResponseTime = { responseTime: 122 }
  t.throws(() => { validateLocalOutput(invalidResponseTime) }, Error('Local responseTime must be a boolean'))

  const invalidLatency = { responseTime: false, latency: 122 }
  t.throws(() => { validateLocalOutput(invalidLatency) }, Error('Local latency must be an object'))

  const missingLatencyMeanMinMax = { responseTime: false, latency: {} }
  t.throws(() => { validateLocalOutput(missingLatencyMeanMinMax) }, Error('Local latency meanMinMax must be specified'))

  const invalidLatencyMeanMinMax = { responseTime: false, latency: { meanMinMax: 122 } }
  t.throws(() => { validateLocalOutput(invalidLatencyMeanMinMax) }, Error('Local latency meanMinMax must be a boolean'))

  const missingLatencyPercentiles = { responseTime: false, latency: { meanMinMax: false } }
  t.throws(() => { validateLocalOutput(missingLatencyPercentiles) }, Error('Local latency percentiles must be specified'))

  const invalidLatencyPercentiles = { responseTime: false, latency: { meanMinMax: false, percentiles: 122 } }
  t.throws(() => { validateLocalOutput(invalidLatencyPercentiles) }, Error('Local latency percentiles must be a boolean'))

  const missingThroughput = { responseTime: false }
  t.throws(() => { validateLocalOutput(missingThroughput) }, Error('Local throughput must be specified'))

  const invalidThroughput = { responseTime: false, throughput: 122 }
  t.throws(() => { validateLocalOutput(invalidThroughput) }, Error('Local throughput must be a boolean'))

  const missingTimeouts = { responseTime: false, throughput: false }
  t.throws(() => { validateLocalOutput(missingTimeouts) }, Error('Local timeouts must be specified'))

  const invalidTimeouts = { responseTime: false, throughput: false, timeouts: 122 }
  t.throws(() => { validateLocalOutput(invalidTimeouts) }, Error('Local timeouts must be a boolean'))

  const missingErrors = { responseTime: false, throughput: false, timeouts: false }
  t.throws(() => { validateLocalOutput(missingErrors) }, Error('Local errors must be specified'))

  const invalidErrors = { responseTime: false, throughput: false, timeouts: false, errors: 122 }
  t.throws(() => { validateLocalOutput(invalidErrors) }, Error('Local errors must be a boolean'))

  const missingOutputPath = { responseTime: false, throughput: false, timeouts: false, errors: false }
  t.throws(() => { validateLocalOutput(missingOutputPath) }, Error('Local outputPath must be specified'))

  const invalidOutputPath = { responseTime: false, throughput: false, timeouts: false, errors: false, outputPath: 122 }
  t.throws(() => { validateLocalOutput(invalidOutputPath) }, Error('Local outputPath must be a string'))

  const relativeOutputPath = { responseTime: false, throughput: false, timeouts: false, errors: false, outputPath: '~/user' }
  t.throws(() => { validateLocalOutput(relativeOutputPath) }, Error('Local outputPath must be absolute'))

  t.same(true, validateLocalOutput(null))
  t.same(true, validateLocalOutput(undefined))

  const validLocal = {
    responseTime: false,
    latency: { meanMinMax: false, percentiles: false },
    throughput: false,
    timeouts: false,
    errors: false,
    outputPath: '/'
  }
  t.same(true, validateLocalOutput(validLocal))

  const validLocalNoLatency = {
    responseTime: false,
    latency: { meanMinMax: false, percentiles: false },
    throughput: false,
    timeouts: false,
    errors: false,
    outputPath: '/'
  }
  t.same(true, validateLocalOutput(validLocalNoLatency))
})
