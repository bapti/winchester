'use strict'

const tap = require('tap')
const test = tap.test

const generateLineChart = require('.')

test('generateLineChart', t => {
  t.plan(1)

  const selector = '#selector'
  const labels = [ 1, 2 ]
  const series = [ [ 1, 2 ], [ 3, 4 ] ]
  const opts = `{ field: 'value' }`

  const expected = `new Chartist.Line('#selector', { labels: [ 1, 2 ], series: [ [ 1, 2 ],[ 3, 4 ] ] }, { field: 'value' })`
  t.same(generateLineChart(selector, labels, series, opts), expected)
})
