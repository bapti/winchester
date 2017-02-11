'use strict'

const tap = require('tap')
const test = tap.test

const { generateTimeoutsScript } = require('.')

test('generateTimeoutsScript', t => {
  t.plan(1)

  const input = [
    [ { timeouts: 1 }, { timeouts: 5 }, { timeouts: 3} ],
    [ { timeouts: 6 }, { timeouts: 2 }, { timeouts: 4 }]
  ]

  const actual = generateTimeoutsScript(input)
  const expected = `new Chartist.Line('#count', { labels: [ 0, 1, 2 ], series: [ [ 1, 5, 3 ],[ 6, 2, 4 ] ] }, { fullWidth: true, height: '500px', chartPadding: { left: 100, right: 80, top: 20, bottom: 30 }, plugins: [ Chartist.plugins.ctAxisTitle({ axisX: { axisTitle: 'Iteration', axisClass: 'ct-axis-title', offset: { x: 0, y: 50 }, textAnchor: 'middle'}, axisY: { axisTitle: 'Timeouts', axisClass: 'ct-axis-title', offset: { x: 0, y: -50 }, textAnchor: 'middle', flipTitle: false} }), Chartist.plugins.ctPointLabels({ textAnchor: 'middle' }) ]})`

  t.same(actual, expected)
})
