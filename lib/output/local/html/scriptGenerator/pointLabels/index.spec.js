'use strict'

const tap = require('tap')
const test = tap.test

const generatePointLabels = require('.')

test('generatePointLabels', t => {
  t.plan(1)

  const expected = `Chartist.plugins.ctPointLabels({ textAnchor: 'middle' })`
  t.same(generatePointLabels(), expected)
})
