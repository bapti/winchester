'use strict'

const tap = require('tap')
const test = tap.test

const { validateStatsDOutput } = require('.')

test('validateStatsDOutput', (t) => {
  t.plan(10)

  const invalidStatsD = 122
  t.throws(() => { validateStatsDOutput(invalidStatsD) }, Error('StatsD config must be an object'))

  const missingHost = {}
  t.throws(() => { validateStatsDOutput(missingHost) }, Error('StatsD host must be specified'))

  const invalidHost = { host: 122 }
  t.throws(() => { validateStatsDOutput(invalidHost) }, Error('StatsD host must be a string'))

  const missingPort = { host: 'host' }
  t.throws(() => { validateStatsDOutput(missingPort) }, Error('StatsD port must be specified'))

  const invalidPort = { host: 'host', port: 'port' }
  t.throws(() => { validateStatsDOutput(invalidPort) }, Error('StatsD port must be an integer'))

  const missingGlobalPrefix = { host: 'host', port: 1234 }
  t.throws(() => { validateStatsDOutput(missingGlobalPrefix) }, Error('StatsD prefix must be specified'))

  const invalidGlobalPrefix = { host: 'host', port: 1234, prefix: 122 }
  t.throws(() => { validateStatsDOutput(invalidGlobalPrefix) }, Error('StatsD prefix must be a string'))

  t.same(true, validateStatsDOutput(null))
  t.same(true, validateStatsDOutput(undefined))

  const validStatsD = { host: 'host', port: 1234, prefix: 'prefix' }
  t.same(true, validateStatsDOutput(validStatsD))
})
