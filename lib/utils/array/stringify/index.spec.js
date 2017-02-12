'use strict'

const tap = require('tap')
const test = tap.test

const { stringify } = require('.')

test('stringify', t => {
  t.plan(1)

  const input = [ 1, 2, 3 ]
  const actual = stringify(input)
  const expected = '1, 2, 3'

  t.same(actual, expected)
})
