'use strict'

const tap = require('tap')
const test = tap.test

const createClient = require('.')

test('createClient', t => {
  t.plan(4)

  const config = { host: 'host', port: 1234, prefix: 'prefix' }
  const actual = createClient(config)

  t.ok(typeof actual, 'object')
  t.same(actual.host, config.host)
  t.same(actual.port, config.port)
  t.same(actual.prefix, config.prefix)
})
