'use strict'

const fs = require('fs')
const path = require('path')

const tap = require('tap')
const test = tap.test

const { build404 } = require('.')

test('build404', t => {
  t.plan(1)

  const expectedPath = path.join(__dirname, './context/index.html')
  const expected = fs.readFileSync(expectedPath, { encoding: 'utf8', flag: 'r' }).trim()

  const actual = build404({ title: 'title', error: 'error' })
  t.same(actual, expected)
})
