'use strict'

const tap = require('tap')
const test = tap.test

const { generateErrors } = require('.')

test('generateErrors', t => {
  t.plan(1)

  const input = [
    [ { title: 'one', errors: 1 }, { title: 'one', errors: 5 }, { title: 'one', errors: 3 } ],
    [ { title: 'two', errors: 6 }, { title: 'two', errors: 2 }, { title: 'two', errors: 4 } ]
  ]

  const actual = generateErrors(input)
  const expected = `new Chartist.Line('#count', { labels: [ 0, 1, 2 ], series: [ [ 1, 5, 3 ],[ 6, 2, 4 ] ] }, { fullWidth: true, height: '500px', chartPadding: { left: 100, right: 80, top: 20, bottom: 30 }, plugins: [ Chartist.plugins.ctAxisTitle({ axisX: { axisTitle: 'Iteration', axisClass: 'ct-axis-title', offset: { x: 0, y: 50 }, textAnchor: 'middle'}, axisY: { axisTitle: 'Errors', axisClass: 'ct-axis-title', offset: { x: 0, y: -50 }, textAnchor: 'middle', flipTitle: false} }), Chartist.plugins.ctPointLabels({ textAnchor: 'middle' }), Chartist.plugins.legend({ legendNames: [ 'one', 'two' ] }) ]})`

  t.same(actual, expected)
})
