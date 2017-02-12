'use strict'

const fs = require('fs')
const path = require('path')

const tap = require('tap')
const test = tap.test

const { buildIndex } = require('.')

test('buildIndex', (t) => {
  t.plan(1)

  const expectedPath = path.join(__dirname, './context/index.html')
  const expected = fs.readFileSync(expectedPath, { encoding: 'utf8', flag: 'r' }).trim()

  const actual = buildIndex('index', 'style')
  t.same(actual, expected)
})
