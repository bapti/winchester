'use strict'

const tap = require('tap')
const test = tap.test

const generateAxisTitles = require('.')

test('generateAxisTitles', t => {
  t.plan(1)

  const xAxis = `{ axisTitle: 'Iteration', axisClass: 'ct-axis-title', offset: { x: 0, y: 50 }, textAnchor: 'middle'}`
  const yAxis = `{ axisTitle: 'title', axisClass: 'ct-axis-title', offset: { x: 0, y: 0 }, textAnchor: 'middle', flipTitle: false}`
  const expected = `Chartist.plugins.ctAxisTitle({ axisX: ${xAxis}, axisY: ${yAxis} })`

  const input = { title: 'title', offset: { x: 0, y: 0 }, flipTitle: false }

  const actual = generateAxisTitles(input)
  t.same(actual, expected)
})
