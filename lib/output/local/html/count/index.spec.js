'use strict'

const fs = require('fs')
const path = require('path')

const expectedPath = path.join(__dirname, './context/index.html')
const expected = fs.readFileSync(expectedPath, { encoding: 'utf8', flag: 'r' }).trim()

const tap = require('tap')
const test = tap.test

const { buildCount } = require('.')

test('buildIndex', (t) => {
  t.plan(1)

  const actual = buildCount('index', 'style', 'script', 'count')
  t.same(actual, expected)
})
