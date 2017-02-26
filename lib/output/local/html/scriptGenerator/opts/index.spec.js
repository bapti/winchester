'use strict'

const tap = require('tap')
const test = tap.test

const opts = require('.')
const generateLineOpts = opts.generateLineOpts
const generateStackedBarOpts = opts.generateStackedBarOpts

test('generateLineOpts', t => {
  t.plan(1)

  const input = [ 1, 2 ]
  const expected = `{ fullWidth: true, height: '500px', chartPadding: { left: 100, right: 80, top: 20, bottom: 30 }, plugins: [ 1, 2 ]}`
  t.same(generateLineOpts(input), expected)
})

test('generateStackedBarOpts', t => {
  t.plan(1)

  const input = [ 1, 2 ]
  const expected = `{ stackBars: true, fullWidth: true, height: '500px', chartPadding: { left: 100, right: 80, top: 20, bottom: 30 }, plugins: [ 1, 2 ]}`
  t.same(generateStackedBarOpts(input), expected)
})
