'use strict'

const tap = require('tap')
const test = tap.test

const generateLatency = require('.')

test('generateLatency', t => {
  t.plan(4)

  const input = [
    [ { title: 'one', latency: { mean: 123.4, min: 12.3, max: 234.5, p50: 100, p75: 200, p90: 300, p99: 400 } }, { title: 'one', latency: { mean: 345.6, min: 34.5, max: 456.7, p50: 100, p75: 200, p90: 300, p99: 400 } }, { title: 'one', latency: { mean: 234.5, min: 23.4, max: 345.6, p50: 100, p75: 200, p90: 300, p99: 400 } } ],
    [ { title: 'two', latency: { mean: 234.5, min: 23.4, max: 345.6, p50: 100, p75: 200, p90: 300, p99: 400 } }, { title: 'two', latency: { mean: 456.7, min: 45.6, max: 567.8, p50: 100, p75: 200, p90: 300, p99: 400 } }, { title: 'two', latency: { mean: 345.6, min: 34.5, max: 456.7, p50: 100, p75: 200, p90: 300, p99: 400 } } ]
  ]

  const latency = generateLatency(input)
  const mean = latency.mean
  const min = latency.min
  const max = latency.max
  const percentiles = latency.percentiles

  const expectedMean = 'new Chartist.Line(\'#mean\', { labels: [ 0, 1, 2 ], series: [ [ 123.4, 345.6, 234.5 ],[ 234.5, 456.7, 345.6 ] ] }, { fullWidth: true, height: \'500px\', chartPadding: { left: 100, right: 80, top: 20, bottom: 30 }, plugins: [ Chartist.plugins.ctAxisTitle({ axisX: { axisTitle: \'Iteration\', axisClass: \'ct-axis-title\', offset: { x: 0, y: 50 }, textAnchor: \'middle\'}, axisY: { axisTitle: \'Mean Latency (ms)\', axisClass: \'ct-axis-title\', offset: { x: 0, y: -50 }, textAnchor: \'middle\', flipTitle: false} }), Chartist.plugins.ctPointLabels({ textAnchor: \'middle\' }), Chartist.plugins.legend({ legendNames: [ \'one\', \'two\' ] }) ]})'
  t.same(mean, expectedMean)

  const expectedMin = 'new Chartist.Line(\'#min\', { labels: [ 0, 1, 2 ], series: [ [ 12.3, 34.5, 23.4 ],[ 23.4, 45.6, 34.5 ] ] }, { fullWidth: true, height: \'500px\', chartPadding: { left: 100, right: 80, top: 20, bottom: 30 }, plugins: [ Chartist.plugins.ctAxisTitle({ axisX: { axisTitle: \'Iteration\', axisClass: \'ct-axis-title\', offset: { x: 0, y: 50 }, textAnchor: \'middle\'}, axisY: { axisTitle: \'Min Latency (ms)\', axisClass: \'ct-axis-title\', offset: { x: 0, y: -50 }, textAnchor: \'middle\', flipTitle: false} }), Chartist.plugins.ctPointLabels({ textAnchor: \'middle\' }), Chartist.plugins.legend({ legendNames: [ \'one\', \'two\' ] }) ]})'
  t.same(min, expectedMin)

  const expectedMax = 'new Chartist.Line(\'#max\', { labels: [ 0, 1, 2 ], series: [ [ 234.5, 456.7, 345.6 ],[ 345.6, 567.8, 456.7 ] ] }, { fullWidth: true, height: \'500px\', chartPadding: { left: 100, right: 80, top: 20, bottom: 30 }, plugins: [ Chartist.plugins.ctAxisTitle({ axisX: { axisTitle: \'Iteration\', axisClass: \'ct-axis-title\', offset: { x: 0, y: 50 }, textAnchor: \'middle\'}, axisY: { axisTitle: \'Max Latency (ms)\', axisClass: \'ct-axis-title\', offset: { x: 0, y: -50 }, textAnchor: \'middle\', flipTitle: false} }), Chartist.plugins.ctPointLabels({ textAnchor: \'middle\' }), Chartist.plugins.legend({ legendNames: [ \'one\', \'two\' ] }) ]})'
  t.same(max, expectedMax)

  const expectedPercentiles = `new Chartist.Bar('#percentiles', { labels: [ 'one', 'two' ], series: [ [ 66.66666666666667, 66.66666666666667 ],[ 133.33333333333334, 133.33333333333334 ],[ 200, 200 ],[ 266.6666666666667, 266.6666666666667 ] ] }, { stackBars: true, fullWidth: true, height: '500px', chartPadding: { left: 100, right: 80, top: 20, bottom: 30 }, plugins: [ Chartist.plugins.ctAxisTitle({ axisX: { axisTitle: 'Iteration', axisClass: 'ct-axis-title', offset: { x: 0, y: 50 }, textAnchor: 'middle'}, axisY: { axisTitle: '50th, 75th, 90th & 99th Latency Percentiles (ms)', axisClass: 'ct-axis-title', offset: { x: 0, y: -50 }, textAnchor: 'middle', flipTitle: false} }), Chartist.plugins.ctPointLabels({ textAnchor: 'middle' }) ]}).on('draw', function (data) { if (data.type === 'bar') { data.element.attr({ style: 'stroke-width: 30px' }) } })`
  t.same(percentiles, expectedPercentiles)
})
