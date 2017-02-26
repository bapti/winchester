'use strict'

const tap = require('tap')
const test = tap.test

const has = require('.')

test('has', t => {
  t.plan(3)

  const arr = [ 1, 2, 3 ]

  const arrHas = has(arr)

  t.ok(arrHas(1))
  t.notOk(arrHas('one'))
  t.same(typeof arrHas, 'function')
})
