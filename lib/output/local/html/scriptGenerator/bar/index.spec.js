'use strict'

const tap = require('tap')
const test = tap.test

const generateStackedBarChart = require('.')

test('generateStackedBarChart', t => {
  t.plan(1)

  const selector = '#mean'
  const labels = [ `'one'`, `'two'` ]
  const series = [ [ 1, 2 ], [ 3, 4] ]
  const opts = `{ field: 'value' }`

  const graph = `new Chartist.Bar('#mean', { labels: [ 'one', 'two' ], series: [ [ 1, 3 ],[ 2, 4 ] ] }, { field: 'value' })`
  const onDraw = `on('draw', function (data) { if (data.type === 'bar') { data.element.attr({ style: 'stroke-width: 30px' }) } })`
  const expected = `${graph}.${onDraw}`

  const actual = generateStackedBarChart(selector, labels, series, opts)
  t.same(actual, expected)
})
