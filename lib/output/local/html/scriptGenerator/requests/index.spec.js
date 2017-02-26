'use strict'

const tap = require('tap')
const test = tap.test

const generateRequests = require('.')

test('generateRequests', t => {
  t.plan(3)

  const input = [
    [ { title: 'one', requests: { mean: 123.4, min: 12.3, max: 234.5 } }, { title: 'one', requests: { mean: 345.6, min: 34.5, max: 456.7 } }, { title: 'one', requests: { mean: 234.5, min: 23.4, max: 345.6 } } ],
    [ { title: 'two', requests: { mean: 234.5, min: 23.4, max: 345.6 } }, { title: 'two', requests: { mean: 456.7, min: 45.6, max: 567.8 } }, { title: 'two', requests: { mean: 345.6, min: 34.5, max: 456.7 } } ]
  ]

  const requests = generateRequests(input)
  const mean = requests.mean
  const min = requests.min
  const max = requests.max

  const expectedMean = 'new Chartist.Line(\'#mean\', { labels: [ 0, 1, 2 ], series: [ [ 123.4, 345.6, 234.5 ],[ 234.5, 456.7, 345.6 ] ] }, { fullWidth: true, height: \'500px\', chartPadding: { left: 100, right: 80, top: 20, bottom: 30 }, plugins: [ Chartist.plugins.ctAxisTitle({ axisX: { axisTitle: \'Iteration\', axisClass: \'ct-axis-title\', offset: { x: 0, y: 50 }, textAnchor: \'middle\'}, axisY: { axisTitle: \'Mean Requests / Second\', axisClass: \'ct-axis-title\', offset: { x: 0, y: -50 }, textAnchor: \'middle\', flipTitle: false} }), Chartist.plugins.ctPointLabels({ textAnchor: \'middle\' }), Chartist.plugins.legend({ legendNames: [ \'one\', \'two\' ] }) ]})'
  t.same(mean, expectedMean)

  const expectedMin = 'new Chartist.Line(\'#min\', { labels: [ 0, 1, 2 ], series: [ [ 12.3, 34.5, 23.4 ],[ 23.4, 45.6, 34.5 ] ] }, { fullWidth: true, height: \'500px\', chartPadding: { left: 100, right: 80, top: 20, bottom: 30 }, plugins: [ Chartist.plugins.ctAxisTitle({ axisX: { axisTitle: \'Iteration\', axisClass: \'ct-axis-title\', offset: { x: 0, y: 50 }, textAnchor: \'middle\'}, axisY: { axisTitle: \'Min Requests / Second\', axisClass: \'ct-axis-title\', offset: { x: 0, y: -50 }, textAnchor: \'middle\', flipTitle: false} }), Chartist.plugins.ctPointLabels({ textAnchor: \'middle\' }), Chartist.plugins.legend({ legendNames: [ \'one\', \'two\' ] }) ]})'
  t.same(min, expectedMin)

  const expectedMax = 'new Chartist.Line(\'#max\', { labels: [ 0, 1, 2 ], series: [ [ 234.5, 456.7, 345.6 ],[ 345.6, 567.8, 456.7 ] ] }, { fullWidth: true, height: \'500px\', chartPadding: { left: 100, right: 80, top: 20, bottom: 30 }, plugins: [ Chartist.plugins.ctAxisTitle({ axisX: { axisTitle: \'Iteration\', axisClass: \'ct-axis-title\', offset: { x: 0, y: 50 }, textAnchor: \'middle\'}, axisY: { axisTitle: \'Max Requests / Second\', axisClass: \'ct-axis-title\', offset: { x: 0, y: -50 }, textAnchor: \'middle\', flipTitle: false} }), Chartist.plugins.ctPointLabels({ textAnchor: \'middle\' }), Chartist.plugins.legend({ legendNames: [ \'one\', \'two\' ] }) ]})'
  t.same(max, expectedMax)
})
