'use strict'

const tap = require('tap')
const test = tap.test

const { generateLegend } = require('.')

test('generateLegend', t => {
  t.plan(1)

  const input = [ `'one'`, `'two'` ]
  const expected = `Chartist.plugins.legend({ legendNames: [ 'one', 'two' ] })`
  t.same(generateLegend(input), expected)
})
